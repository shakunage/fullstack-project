import re

# Extract all hour values from the markdown using regex
with open('docs/timekeeping.md', 'r') as f:
    markdown = f.read()

# Find all numbers in the Hours column using regex
hours = [float(h) for h in re.findall(r"\|\s*(\d+(?:\.\d+)?)\s*\|", markdown)]

# Compute the total
total_hours = sum(hours)
print(total_hours)
