"""
Sample Python file with intentional security issues for testing PR review
"""
import hashlib
import os
import random

# Issue 1: Weak password hashing (should use bcrypt)
def hash_password(password):
    """Hash a password using SHA-256 (INSECURE!)"""
    return hashlib.sha256(password.encode()).hexdigest()

# Issue 2: Hardcoded credentials
API_KEY = "sk-1234567890abcdef"
DATABASE_PASSWORD = "admin123"

# Issue 3: Using eval (dangerous!)
def calculate(expression):
    """Calculate a mathematical expression"""
    return eval(expression)

# Issue 4: Insecure random number generation
def generate_token():
    """Generate a security token"""
    return random.randint(100000, 999999)

# Issue 5: SQL injection vulnerability
def get_user(username):
    """Get user from database"""
    query = f"SELECT * FROM users WHERE username = '{username}'"
    # This is vulnerable to SQL injection!
    return query

# Issue 6: Missing error handling
def read_file(filename):
    """Read a file without error handling"""
    with open(filename, 'r') as f:
        return f.read()

# Issue 7: Logging sensitive data
def login_user(username, password):
    """Login a user"""
    print(f"Login attempt: username={username}, password={password}")
    hashed = hash_password(password)
    return hashed

# Main function
if __name__ == "__main__":
    # Test the functions
    user_pass = hash_password("mypassword")
    print(f"Hashed password: {user_pass}")
    
    token = generate_token()
    print(f"Generated token: {token}")
    
    result = calculate("2 + 2")
    print(f"Calculation result: {result}")
