from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from typing import List
import os
import zipfile
import io
from dotenv import load_dotenv
from agent import StudyAgent

load_dotenv()

app = FastAPI(title="Learn AI - Study Copilot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

study_agent = StudyAgent()

@app.post("/api/generate")
async def generate_study_materials(
    notes: List[UploadFile] = File(...)
):
    """Generate study materials from uploaded notes"""
    try:
        print(f"Received request with {len(notes)} notes")
        
        # Read uploaded files
        notes_content = []
        for note in notes:
            content = await note.read()
            notes_content.append({
                "filename": note.filename,
                "content": content,
                "content_type": note.content_type
            })
            print(f"Loaded note: {note.filename} ({len(content)} bytes)")
        
        # Process with LangGraph agent
        print("Starting LangGraph workflow...")
        result = await study_agent.process(notes_content)
        print("Workflow completed successfully")
        
        # Return JSON response directly
        return {
            "study_plan": result["study_plan"],
            "flashcards": result["flashcards"],
            "mcqs": result["mcqs"],
            "spaced_repetition": result["spaced_repetition"]
        }
    
    except Exception as e:
        import traceback
        error_detail = traceback.format_exc()
        print(f"Error occurred: {error_detail}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/download")
async def download_study_materials(data: dict):
    """Create and download ZIP file from study materials"""
    try:
        # Create ZIP file
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            zip_file.writestr("study_plan.md", data.get("study_plan", ""))
            zip_file.writestr("flashcards.json", data.get("flashcards", "[]"))
            zip_file.writestr("mcqs.json", data.get("mcqs", "[]"))
            zip_file.writestr("spaced_repetition.md", data.get("spaced_repetition", ""))
        
        zip_buffer.seek(0)
        
        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={"Content-Disposition": "attachment; filename=study_materials.zip"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
