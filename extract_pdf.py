from pypdf import PdfReader
import sys

def extract_text(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        text = ""
        # Extract first 50 pages to get a good overview without overwhelming
        for i in range(min(50, len(reader.pages))):
            text += f"--- Page {i+1} ---\n"
            text += reader.pages[i].extract_text() + "\n"
        return text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    path = r"e:\study\ai-demo\docs\book1-claude-code.pdf"
    print(extract_text(path))
