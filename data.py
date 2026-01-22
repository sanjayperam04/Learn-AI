import os
import sqlite3
import subprocess

# Hardcoded secret - NEVER do this!
API_KEY = "super_secret_key_123"

def login_user(username, password):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # SQL Injection: direct string interpolation
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    cursor.execute(query)
    return cursor.fetchone()

def delete_file(filename):
    # Command Injection: unsanitized shell command
    os.system(f"rm {filename}")

def compute_expression(expr):
    # Eval Injection: executes arbitrary code
    return eval(expr)

def read_file(path):
    # Directory Traversal: no path validation
    with open(path, 'r') as f:
        return f.read()

# Example usage (all vulnerable)
print(login_user("admin' OR '1'='1", ""))  # Bypasses login
delete_file("file.txt; cat /etc/passwd")    # Runs extra command
print(compute_expression("__import__('os').system('ls')"))  # Arbitrary code
print(read_file("../../etc/passwd"))         # Accesses sensitive file
