import os

directory = "./"  # Replace with the path to your directory
output_file = "output.txt"  # Replace with the name of your output file

with open(output_file, "w") as f:
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.endswith(".jsx"):
                filepath = os.path.join(root, filename)
                with open(filepath, "r") as jsx_file:
                    f.write(f"Excerpt from {filepath}:\n")
                    f.write(jsx_file.read())
                    f.write("\n\n")