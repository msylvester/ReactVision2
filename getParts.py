import csv
import re

# Input and output file names
input_file = 'combined_output.csv'
output_file = 'unique_parts.csv'

# Set to hold unique part IDs
unique_parts = set()

# Regular expression to match "Part <part_id>: <quantity>"
part_pattern = re.compile(r'Part (\d+):')

# Read the input file and extract unique part IDs
with open(input_file, 'r') as file:
    for line in file:
        match = part_pattern.search(line)
        if match:
            part_id = match.group(1)
            unique_parts.add(part_id)

# Write the unique part IDs to the CSV output file
with open(output_file, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Part ID'])  # Write the header
    for part in sorted(unique_parts):  # Sort for a clean output
        writer.writerow([part])

print(f"Unique parts have been written to {output_file}")
