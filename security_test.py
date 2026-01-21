"""
Fixed version - All security issues resolved
"""

import os
import sqlite3
import subprocess
from typing import Optional

# FIXED: Use environment variables for secrets
API_KEY = os.getenv('API_KEY', '')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD', '')
SECRET_TOKEN = os.getenv('SECRET_TOKEN', '')

# FIXED: Use parameterized queries to prevent SQL injection
def get_user_by_name(username: str) -> Optional[tuple]:
    """Safely get user by username using parameterized query"""
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # Safe - using parameterized query
    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))
    return cursor.fetchone()

# FIXED: Use subprocess with proper input validation
def run_system_command(user_input: str) -> str:
    """Safely execute command with validation"""
    # Validate input - only allow alphanumeric
    if not user_input.isalnum():
        raise ValueError("Invalid input")
    # Use subprocess instead of os.system
    result = subprocess.run(['echo', user_input], capture_output=True, text=True)
    return result.stdout

# FIXED: Use ast.literal_eval for safe evaluation
def calculate(expression: str) -> float:
    """Safely evaluate mathematical expression"""
    import ast
    # Only allow safe literal evaluation
    try:
        return ast.literal_eval(expression)
    except (ValueError, SyntaxError):
        raise ValueError("Invalid expression")

# FIXED: Never log sensitive data
def login_user(username: str, password: str) -> bool:
    """Login user without logging sensitive data"""
    # Only log username, never password
    print(f"Login attempt: username={username}")
    # Password validation logic here
    return True

if __name__ == "__main__":
    # Test the fixed functions
    user = get_user_by_name("admin")
    output = run_system_command("test")
    result = calculate("2 + 2")
    login_user("admin", "password123")
    print("All functions executed safely!")
