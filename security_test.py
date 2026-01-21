"""
Test file with security issues for Radar dashboard
"""

import os
import sqlite3

# ISSUE 1: Hardcoded credentials (CRITICAL)
API_KEY = "sk_live_1234567890abcdef"
DATABASE_PASSWORD = "admin123"
SECRET_TOKEN = "my-secret-token-12345"

# ISSUE 2: SQL Injection vulnerability (CRITICAL)
def get_user_by_name(username):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # Vulnerable - user input directly in query
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    return cursor.fetchone()

# ISSUE 3: Command injection (HIGH)
def run_system_command(user_input):
    # Dangerous - allows command injection
    os.system(f"echo {user_input}")
    return "Command executed"

# ISSUE 4: Use of eval (HIGH)
def calculate(expression):
    # eval is dangerous - can execute arbitrary code
    result = eval(expression)
    return result

# ISSUE 5: Logging sensitive data (MEDIUM)
def login_user(username, password):
    print(f"Login attempt: username={username}, password={password}")
    # Passwords should NEVER be logged!
    return True

if __name__ == "__main__":
    # Test the vulnerable functions
    user = get_user_by_name("admin")
    run_system_command("test")
    result = calculate("2 + 2")
    login_user("admin", "password123")
