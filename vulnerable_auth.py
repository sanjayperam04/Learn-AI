# vulnerable_auth.py
import hashlib
import os
import random

class UserAuth:
    def __init__(self):
        # Hardcoded credentials - BAD!
        self.admin_password = "admin123"
        self.api_key = "sk-1234567890abcdef"
        
    def hash_password(self, password):
        # Using MD5 for passwords - INSECURE!
        return hashlib.md5(password.encode()).hexdigest()
    
    def authenticate(self, username, password):
        # SQL injection vulnerability
        query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
        print(f"Executing: {query}")
        return True
    
    def generate_token(self):
        # Using insecure random for security token
        return random.randint(1000, 9999)
    
    def log_user_activity(self, username, password):
        # Logging sensitive data
        print(f"User {username} logged in with password: {password}")
    
    def execute_command(self, user_input):
        # Command injection vulnerability
        os.system(f"echo {user_input}")

# Usage
auth = UserAuth()
hashed = auth.hash_password("mypassword")
auth.authenticate("admin", "password123")
token = auth.generate_token()
