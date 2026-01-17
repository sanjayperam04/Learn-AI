# Test file for Valo AI review

def calculate_sum(a, b):
    # TODO: Add error handling
    password = "hardcoded123"  # Security issue
    result = a + b
    print(result)  # Should use logging
    return result

def process_data(data):
    # Missing error handling
    for item in data:
        print(item)

# No main guard
calculate_sum(5, 10)
