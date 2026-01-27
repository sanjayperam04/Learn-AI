"""
Sample code with security issues for testing Radar dashboard
Create a PR with this file to see issues tracked in Radar
"""

import os
import sqlite3

# ISSUE 1: Hardcoded credentials (CRITICAL)
API_KEY = "sk_live_1234567890abcdef"
DATABASE_PASSWORD = "admin123"

# ISSUE 2: SQL Injection vulnerability (CRITICAL)
def get_user(username):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # Vulnerable to SQL injection
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    return cursor.fetchone()

# ISSUE 3: Command injection (HIGH)
def run_command(user_input):
    # Dangerous - allows command injection
    os.system(f"echo {user_input}")

# ISSUE 4: Insecure random (MEDIUM)
import random
def generate_token():
    # Should use secrets module for security
    return random.randint(1000, 9999)

# ISSUE 5: Missing input validation (HIGH)
def process_data(data):
    # No validation - could cause issues
    result = eval(data)  # eval is dangerous!
    return result

# ISSUE 6: Exposed sensitive data in logs (MEDIUM)
def login(username, password):
    print(f"Login attempt: {username} with password {password}")
    # Passwords should never be logged!
    return True

if __name__ == "__main__":
    # Test the vulnerable functions
    get_user("admin")
    run_command("test")
    token = generate_token()
    print(f"Token: {token}")
