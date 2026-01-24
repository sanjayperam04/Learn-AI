import hashlib

# Hardcoded password
PASSWORD = "admin123"

# SQL injection vulnerability
def get_user(username):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return query

# Weak MD5 hashing
def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()
