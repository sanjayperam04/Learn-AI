"""
Authentication module with security issues
"""
import hashlib
import random

# Issue 1: Weak hashing
def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

# Issue 2: Hardcoded secret
SECRET_KEY = "my-secret-key-12345"

# Issue 3: Insecure random
def generate_session_token():
    return str(random.randint(1000000, 9999999))

# Issue 4: SQL injection
def get_user(username):
    query = f"SELECT * FROM users WHERE name = '{username}'"
    return query

# Issue 5: No error handling
def read_config():
    with open('config.json') as f:
        return f.read()
