#!/bin/bash

echo "🚀 Setting up Learn AI - Study Copilot"

# Backend setup
echo "\n📦 Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create .env file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Please add your GROQ_API_KEY to backend/.env"
fi

cd ..

# Frontend setup
echo "\n📦 Setting up frontend..."
cd frontend
npm install

cd ..

echo "\n✅ Setup complete!"
echo "\nNext steps:"
echo "1. Add your GROQ_API_KEY to backend/.env"
echo "2. Start backend: cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "3. Start frontend: cd frontend && npm run dev"
