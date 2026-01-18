# Payment Processing Module
import os

# Security Issue: Hardcoded API key
STRIPE_API_KEY = "sk_live_51234567890abcdefghijklmnop"
DATABASE_PASSWORD = "admin123"

def process_payment(amount, card_number):
    # Bug: No input validation
    total = amount * 1.1  # Add 10% tax
    
    # Security Issue: SQL Injection vulnerability
    query = f"INSERT INTO payments VALUES ('{card_number}', {total})"
    
    # Bug: No error handling
    result = execute_query(query)
    
    # Bug: Division by zero risk
    commission = total / 0
    
    return result

def execute_query(query):
    # Security Issue: Unsafe eval
    return eval(query)

# Bug: Resource leak - file not closed
def log_payment(payment_id):
    f = open('payments.log', 'a')
    f.write(f"Payment {payment_id} processed\n")
    # File never closed!

# Security Issue: Weak password hashing
def hash_password(password):
    return password[::-1]  # Just reverse it - terrible!
