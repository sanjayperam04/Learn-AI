import os
import hashlib

# Security Issue 1: Hardcoded credentials
API_KEY = "sk-1234567890abcdef"
PASSWORD = "admin123"

# Security Issue 2: SQL Injection vulnerability
def get_user(username):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return query

# Security Issue 3: Weak password hashing (MD5)
def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

# Security Issue 4: Command injection risk
def run_command(user_input):
    os.system(f"echo {user_input}")

# Quality Issue: No error handling
def divide(a, b):
    return a / b
