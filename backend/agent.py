from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.prompts import ChatPromptTemplate
import PyPDF2
import io
import json
import os

class AgentState(TypedDict):
    notes_content: List[Dict[str, Any]]
    topics: List[str]
    vectorstore: Any
    study_plan: str
    flashcards: str
    mcqs: str
    spaced_repetition: str

class StudyAgent:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")
        
        self.llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            temperature=0.4,
            max_tokens=8000,
            groq_api_key=api_key
        )
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        self.workflow = self._build_workflow()
    
    def _extract_text_from_pdf(self, content: bytes) -> str:
        """Extract text from PDF bytes"""
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    
    def _extract_topics(self, state: AgentState) -> AgentState:
        """Node 1: Extract topics from notes"""
        try:
            # Combine all notes text
            all_notes_text = ""
            for note in state["notes_content"]:
                if note["content_type"] == "application/pdf":
                    text = self._extract_text_from_pdf(note["content"])
                else:
                    text = note["content"].decode("utf-8")
                all_notes_text += text + "\n\n"
            
            prompt = ChatPromptTemplate.from_template(
                "Extract key topics and subjects from these study notes. Return ONLY a JSON array of strings, no other text.\n\nNotes:\n{notes}\n\nJSON array:"
            )
            
            response = self.llm.invoke(prompt.format(notes=all_notes_text[:8000]))  # Limit to avoid token limits
            content = response.content.strip()
            
            # Try to extract JSON if wrapped in markdown
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()
            
            topics = json.loads(content)
            state["topics"] = topics
            return state
        except Exception as e:
            print(f"Error extracting topics: {e}")
            print(f"Response content: {response.content if 'response' in locals() else 'No response'}")
            raise

    
    def _create_vectorstore(self, state: AgentState) -> AgentState:
        """Node 2: Create RAG vectorstore from notes"""
        all_texts = []
        
        for note in state["notes_content"]:
            if note["content_type"] == "application/pdf":
                text = self._extract_text_from_pdf(note["content"])
            else:
                text = note["content"].decode("utf-8")
            all_texts.append(text)
        
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1500,
            chunk_overlap=300
        )
        chunks = text_splitter.create_documents(all_texts)
        
        vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=self.embeddings
        )
        
        state["vectorstore"] = vectorstore
        return state
    
    def _generate_study_plan(self, state: AgentState) -> AgentState:
        """Node 3: Generate study plan"""
        topics_str = "\n".join([f"- {topic}" for topic in state["topics"]])
        
        # Retrieve relevant context
        retriever = state["vectorstore"].as_retriever(search_kwargs={"k": 10})
        docs = retriever.get_relevant_documents(" ".join(state["topics"]))
        context = "\n\n".join([doc.page_content for doc in docs])
        
        prompt = ChatPromptTemplate.from_template(
            """Create a COMPREHENSIVE and DETAILED study plan based on these topics and notes.

Topics:
{topics}

Notes Context:
{context}

Generate an EXTENSIVE study plan (minimum 500 words) with:

1. **Overview** (2-3 paragraphs explaining the learning journey)

2. **Week-by-Week Breakdown** (at least 4-6 weeks):
   - Week X: [Topic Name]
     * Learning Objectives (3-5 detailed objectives)
     * Daily Tasks (specific activities for each day)
     * Time Estimates (realistic hours per task)
     * Key Concepts to Master
     * Practice Exercises

3. **Learning Milestones**:
   - What you should know by Week 2
   - What you should know by Week 4
   - Final mastery goals

4. **Study Techniques**:
   - Active recall strategies
   - Note-taking methods
   - Practice approaches

5. **Recommended Resources**:
   - Books and articles
   - Online courses
   - Practice platforms
   - Community resources

6. **Assessment Strategy**:
   - Self-assessment checkpoints
   - Practice test schedule
   - Review sessions

Format as detailed markdown with headers, bullet points, and clear structure.
Make it comprehensive, actionable, and motivating."""
        )
        
        response = self.llm.invoke(prompt.format(topics=topics_str, context=context))
        state["study_plan"] = response.content
        return state
    
    def _generate_flashcards(self, state: AgentState) -> AgentState:
        """Node 4: Generate flashcards"""
        try:
            retriever = state["vectorstore"].as_retriever(search_kwargs={"k": 15})
            docs = retriever.get_relevant_documents(" ".join(state["topics"]))
            context = "\n\n".join([doc.page_content for doc in docs])
            
            prompt = ChatPromptTemplate.from_template(
                """Create COMPREHENSIVE flashcards for these topics using the provided notes.

Topics:
{topics}

Notes:
{context}

Generate 25-35 HIGH-QUALITY flashcards as JSON array with format:
[{{"front": "question", "back": "detailed answer", "topic": "topic_name"}}]

IMPORTANT REQUIREMENTS:
1. Front: Clear, specific questions (not just "What is X?")
2. Back: DETAILED answers (3-5 sentences minimum, include examples, explanations, and context)
3. Cover all major concepts from the notes
4. Include definition cards, application cards, and comparison cards
5. Make answers comprehensive and educational

Example of GOOD flashcard:
{{
  "front": "Explain the concept of state management in React and why it's important",
  "back": "State management in React refers to how data is stored and updated in components. It's crucial because React components re-render when state changes, allowing the UI to stay synchronized with data. State can be local (useState) or global (Context API, Redux). Proper state management prevents prop drilling, improves performance, and makes applications more maintainable. For example, a shopping cart's items would be stored in state so the UI updates when items are added or removed."
}}

Return ONLY valid JSON array, no markdown formatting or additional text."""
            )
            
            response = self.llm.invoke(prompt.format(
                topics="\n".join(state["topics"]),
                context=context
            ))
            
            content = response.content.strip()
            # Try to extract JSON if wrapped in markdown
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()
            
            # Validate JSON
            json.loads(content)
            state["flashcards"] = content
            return state
        except Exception as e:
            print(f"Error generating flashcards: {e}")
            print(f"Response content: {response.content if 'response' in locals() else 'No response'}")
            raise
    
    def _generate_mcqs(self, state: AgentState) -> AgentState:
        """Node 5: Generate MCQs"""
        try:
            retriever = state["vectorstore"].as_retriever(search_kwargs={"k": 15})
            docs = retriever.get_relevant_documents(" ".join(state["topics"]))
            context = "\n\n".join([doc.page_content for doc in docs])
            
            prompt = ChatPromptTemplate.from_template(
                """Create COMPREHENSIVE multiple choice questions based on these topics and notes.

Topics:
{topics}

Notes:
{context}

Generate 20-25 HIGH-QUALITY MCQs as JSON array with format:
[{{
  "question": "detailed question text",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correct": 0,
  "explanation": "comprehensive explanation",
  "topic": "topic_name"
}}]

IMPORTANT REQUIREMENTS:
1. Questions: Clear, specific, and test understanding (not just memorization)
2. Options: All plausible, similar length, no obvious wrong answers
3. Explanations: DETAILED (4-6 sentences minimum) - explain why the correct answer is right AND why other options are wrong
4. Cover various difficulty levels (easy, medium, hard)
5. Include conceptual, application, and analysis questions

Example of GOOD MCQ:
{{
  "question": "In React, when would you use useEffect with an empty dependency array []?",
  "options": [
    "When you want the effect to run only once after the initial render",
    "When you want the effect to run on every render",
    "When you want the effect to run only when props change",
    "When you want to prevent the effect from running at all"
  ],
  "correct": 0,
  "explanation": "An empty dependency array [] means the effect runs only once after the initial render, similar to componentDidMount in class components. This is useful for one-time setup like API calls or subscriptions. Option B is wrong because that would require no dependency array at all. Option C is wrong because you'd need to include those props in the dependency array. Option D is wrong because the effect would still run once initially. This pattern is commonly used for fetching initial data or setting up event listeners that should only be created once.",
  "topic": "React Hooks"
}}

Return ONLY valid JSON array, no markdown formatting or additional text."""
            )
            
            response = self.llm.invoke(prompt.format(
                topics="\n".join(state["topics"]),
                context=context
            ))
            
            content = response.content.strip()
            # Try to extract JSON if wrapped in markdown
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()
            
            # Validate JSON
            json.loads(content)
            state["mcqs"] = content
            return state
        except Exception as e:
            print(f"Error generating MCQs: {e}")
            print(f"Response content: {response.content if 'response' in locals() else 'No response'}")
            raise
    
    def _generate_spaced_repetition(self, state: AgentState) -> AgentState:
        """Node 6: Generate spaced repetition schedule"""
        topics_str = "\n".join([f"- {topic}" for topic in state["topics"]])
        
        prompt = ChatPromptTemplate.from_template(
            """Create a COMPREHENSIVE spaced repetition schedule for these topics.

Topics:
{topics}

Generate a DETAILED schedule (minimum 400 words) using the following intervals:
- Day 1: Initial learning
- Day 3: First review
- Day 7: Second review
- Day 14: Third review
- Day 30: Fourth review
- Day 60: Fifth review

For EACH review day, provide:

1. **Review Focus**: Which topics to prioritize
2. **Specific Activities** (4-6 activities):
   - Flashcard review (which topics)
   - Practice problems (specific types)
   - Concept mapping
   - Teaching/explaining concepts
   - Real-world application exercises
3. **Time Allocation**: How long to spend on each activity
4. **Success Criteria**: How to know you've mastered the material
5. **Common Pitfalls**: What mistakes to avoid

Also include:

**Between Review Sessions**:
- What to do in the gaps between reviews
- How to maintain engagement
- Progressive difficulty recommendations

**Study Tips for Spaced Repetition**:
- Active recall techniques
- Interleaving strategies
- Self-testing methods
- How to identify weak areas
- When to move topics to longer intervals

**Progress Tracking**:
- How to measure retention
- When to adjust the schedule
- Signs you need more frequent reviews

Format as detailed markdown with clear headers, bullet points, and actionable advice.
Make it practical and motivating."""
        )
        
        response = self.llm.invoke(prompt.format(topics=topics_str))
        state["spaced_repetition"] = response.content
        return state
    
    def _build_workflow(self) -> StateGraph:
        """Build LangGraph workflow"""
        workflow = StateGraph(AgentState)
        
        # Add nodes
        workflow.add_node("extract_topics", self._extract_topics)
        workflow.add_node("create_vectorstore", self._create_vectorstore)
        workflow.add_node("generate_study_plan", self._generate_study_plan)
        workflow.add_node("generate_flashcards", self._generate_flashcards)
        workflow.add_node("generate_mcqs", self._generate_mcqs)
        workflow.add_node("generate_spaced_repetition", self._generate_spaced_repetition)
        
        # Define edges
        workflow.set_entry_point("extract_topics")
        workflow.add_edge("extract_topics", "create_vectorstore")
        workflow.add_edge("create_vectorstore", "generate_study_plan")
        workflow.add_edge("generate_study_plan", "generate_flashcards")
        workflow.add_edge("generate_flashcards", "generate_mcqs")
        workflow.add_edge("generate_mcqs", "generate_spaced_repetition")
        workflow.add_edge("generate_spaced_repetition", END)
        
        return workflow.compile()
    
    async def process(self, notes_content: List[Dict]) -> Dict:
        """Process files through the workflow"""
        initial_state = {
            "notes_content": notes_content,
            "topics": [],
            "vectorstore": None,
            "study_plan": "",
            "flashcards": "",
            "mcqs": "",
            "spaced_repetition": ""
        }
        
        final_state = self.workflow.invoke(initial_state)
        
        return {
            "study_plan": final_state["study_plan"],
            "flashcards": final_state["flashcards"],
            "mcqs": final_state["mcqs"],
            "spaced_repetition": final_state["spaced_repetition"]
        }
