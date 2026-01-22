"""
User Authentication API - Flask Application
This file contains INTENTIONAL security issues for testing Valo AI
"""

from flask import Flask, request, jsonify
import sqlite3
import hashlib
import os

app = Flask(__name__)

# ISSUE 1: Hardcoded credentials
DATABASE_PASSWORD = "admin123"
SECRET_KEY = "my-secret-key-12345"
API_TOKEN = "sk-1234567890abcdef"

# ISSUE 2: Hardcoded database connection
DATABASE_PATH = "/var/db/users.db"

# ISSUE 3: SQL Injection vulnerability
@app.route('/api/user/<user_id>', methods=['GET'])
def get_user(user_id):
    """Get user by ID - VULNERABLE TO SQL INJECTION"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Direct string interpolation - SQL injection risk
    query = f"SELECT * FROM users WHERE id = {user_id}"
    cursor.execute(query)
    
    user = cursor.fetchone()
    return jsonify(user)

# ISSUE 4: SQL Injection in login
@app.route('/api/login', methods=['POST'])
def login():
    """User login - VULNERABLE TO SQL INJECTION"""
    username = request.json.get('username')
    password = request.json.get('password')
    
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # String formatting - SQL injection risk
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    cursor.execute(query)
    
    user = cursor.fetchone()
    
    if user:
        return jsonify({"status": "success", "token": API_TOKEN})
    return jsonify({"status": "failed"}), 401

# ISSUE 5: Weak password hashing
@app.route('/api/register', methods=['POST'])
def register():
    """Register new user - WEAK HASHING"""
    username = request.json.get('username')
    password = request.json.get('password')
    
    # MD5 is cryptographically broken
    hashed_password = hashlib.md5(password.encode()).hexdigest()
    
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Still vulnerable to SQL injection
    query = f"INSERT INTO users (username, password) VALUES ('{username}', '{hashed_password}')"
    cursor.execute(query)
    conn.commit()
    
    return jsonify({"status": "registered"})

# ISSUE 6: No input validation
@app.route('/api/update-profile', methods=['POST'])
def update_profile():
    """Update user profile - NO VALIDATION"""
    user_id = request.json.get('user_id')
    email = request.json.get('email')
    phone = request.json.get('phone')
    
    # No validation of email format, phone format, etc.
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    query = f"UPDATE users SET email = '{email}', phone = '{phone}' WHERE id = {user_id}"
    cursor.execute(query)
    conn.commit()
    
    return jsonify({"status": "updated"})

# ISSUE 7: Arbitrary file read
@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):
    """Download file - PATH TRAVERSAL VULNERABILITY"""
    # No path validation - can access any file
    file_path = f"/uploads/{filename}"
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    return content

# ISSUE 8: Using eval on user input
@app.route('/api/calculate', methods=['POST'])
def calculate():
    """Calculate expression - CODE INJECTION"""
    expression = request.json.get('expression')
    
    # NEVER use eval on user input!
    result = eval(expression)
    
    return jsonify({"result": result})

# ISSUE 9: Debug mode in production
if __name__ == '__main__':
    # Debug mode exposes sensitive information
    app.run(debug=True, host='0.0.0.0', port=5000)
