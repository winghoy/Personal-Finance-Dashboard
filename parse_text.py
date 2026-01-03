import pymupdf
import re
from rapidfuzz import process, fuzz
from config import merchants_map, months, months_dict, categories
from sentence_transformers import SentenceTransformer

out = []
file = pymupdf.open('./files/dec25.pdf')
model = SentenceTransformer('all-MiniLM-L6-v2')
current_date = ''

category_embeddings = {
    category: model.encode(description) for category, description in categories.items()
}

def normalise_text(text):
    text = text.lower()
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'-', '', text)
    text = re.sub(r'\b(www.|store|branch|.co.uk|ltd|.co|.com)', '', text)
    return text.strip()

def match_merchant(merchant):
    match, score, _ = process.extractOne(query=merchant, choices=merchants_map.keys(), scorer=fuzz.partial_ratio)
    if score >= 70:
        return match.title().strip()
    return merchant.title().strip()

def parse_file(file):
    for page in file:
        text = page.get_text()
        line_number = 0
        lines = [line for line in text.splitlines() if line.strip()]

        while line_number < len(lines):
            line = lines[line_number]
            # Get the month according to text
            for m in months:
                if m in line and len(line) < 10:
                    words = line.split(' ')
                    words[1] = months_dict.get(words[1])
                    current_date = '/'.join(word for word in words)

            if line in [')))', 'VIS', 'BP', 'OBP']:
                line_number += 1
                line = lines[line_number]
                transaction = []

                merchant = normalise_text(line)
                merchant = match_merchant(merchant)
                transaction.append(merchant)
                # a.append(merchant)

                # Categorise
                if merchant in merchants_map:
                    transaction.append(merchants_map[merchant])
                    # b.append(merchants_map[merchant])
                else:
                    category = None
                    highest_score = -1
                    merchant_embedding = model.encode(merchant)
                    for cat, description_embedding in category_embeddings.items():
                        score = model.similarity(merchant_embedding, description_embedding).item()
                        if score > highest_score:
                            highest_score = score
                            category = cat
                    if highest_score > 0.2:
                        transaction.append(category)
                        # b.append(category)
                    else:
                        transaction.append('Other')
                        # b.append('Other')

                
                # Iterate until it goes through the first instance of a price
                while line[-3] != '.' or line[-1] not in '1234567890':
                    line_number += 1
                    line = lines[line_number]
                transaction.append(line) # Price
                # c.append(line)
                transaction.append(current_date)
                # d.append(current_date)
                out.append(transaction)
                
            line_number += 1
parse_file(file)