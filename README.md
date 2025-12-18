# Learn AI - Study Copilot 🧠

> Transform your study materials into comprehensive learning resources with AI

Full-stack AI-powered study assistant that generates personalized study plans, interactive flashcards, practice MCQs, and spaced repetition schedules from your notes and syllabus.

![Tech Stack](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green)
![LangGraph](https://img.shields.io/badge/LangGraph-0.0.20-orange)
![Groq](https://img.shields.io/badge/Groq-Llama%203.1%2070B-purple)

## ✨ Features

- 📤 **Multi-File Upload**: Drag & drop PDF/Markdown notes and syllabus
- 🤖 **AI Generation**: Powered by Groq's Llama 3.1 70B via LangGraph workflow
- 📚 **Study Plans**: Weekly breakdown with objectives and time estimates
- 🎴 **Interactive Flashcards**: Beautiful flip animations for active recall
- ✅ **Practice MCQs**: Auto-generated questions with explanations
- 📅 **Spaced Repetition**: Science-based review schedule (Days 1, 3, 7, 14, 30, 60)
- 💾 **Export ZIP**: Download all materials in one package
- 🎨 **Minimalistic UI**: Clean, distraction-free design
- 🚀 **Demo Mode**: Try it without uploading files

## 🏗️ Architecture

### Backend (FastAPI + LangGraph)
```
LangGraph 6-Node Workflow:
1. Extract Topics → 2. Create RAG Vectorstore → 3. Generate Study Plan
4. Generate Flashcards → 5. Generate MCQs → 6. Generate Spaced Rep Schedule
```

### Frontend (React + Vite)
```
React 18 + TanStack Query + Tailwind CSS
Drag-drop upload → API call → Loading state → Tabbed results → Download ZIP
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- [Groq API Key](https://console.groq.com) (free tier available)

### Option 1: Automated Setup
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
echo "GROQ_API_KEY=your_key_here" > .env
uvicorn main:app --reload
```

**Frontend (new terminal):**
```bash
cd frontend
npm install
npm run dev
```

### Usage
1. Open http://localhost:5173
2. Upload notes (multiple PDFs/MD files) + syllabus (single file)
3. Click "Generate Study Materials" (or try Demo mode)
4. Explore tabs: Study Plan, Flashcards, MCQs, Spaced Repetition
5. Download ZIP with all materials

## 📖 Documentation

- [QUICKSTART.md](QUICKSTART.md) - Get running in 5 minutes
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [FEATURES.md](FEATURES.md) - Complete feature list
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Architecture deep dive

## 🛠️ Tech Stack

**Backend:**
- FastAPI - Modern Python web framework
- LangGraph - Workflow orchestration
- LangChain - Document processing & RAG
- Groq - LLM API (Llama 3.1 70B)
- Chroma - Vector database
- PyPDF2 - PDF text extraction

**Frontend:**
- React 18 - UI library
- Vite - Build tool
- TanStack Query - Server state management
- Tailwind CSS - Styling
- react-dropzone - File upload
- Lucide React - Icons

## 📁 Project Structure

```
learn-ai/
├── backend/          # FastAPI + LangGraph
│   ├── main.py       # API endpoints
│   ├── agent.py      # LangGraph workflow
│   └── requirements.txt
├── frontend/         # React + Vite
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── api/         # API client
│   │   └── App.jsx      # Main app
│   └── package.json
└── samples/          # Example files for testing
```

## 🎯 Use Cases

- 📖 **Students**: Exam prep, course review, self-study
- 👨‍🏫 **Teachers**: Create study guides, practice questions
- 💼 **Professionals**: Certification prep, skill development
- 🎓 **Lifelong Learners**: Personal development, hobby learning

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🙏 Acknowledgments

- Groq for fast LLM inference
- LangChain team for excellent tools
- React and Vite communities
