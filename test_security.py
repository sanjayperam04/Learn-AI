# test_security.py
import hashlib

def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()  # Weak hashing!

user_password = "admin123"
hashed = hash_password(user_password)
print(f"Hashed password: {hashed}")
