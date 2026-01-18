def divide(a, b):
    return a / b  # Bug: No zero division check

password = "admin123"  # Security: Hardcoded password
api_key = "sk_test_123456"  # Security: Exposed API key

def process(data):
    result = eval(data)  # Security: Code injection risk
    return result

# Missing error handling
def read_file(filename):
    f = open(filename)  # Bug: File not closed
    return f.read()
