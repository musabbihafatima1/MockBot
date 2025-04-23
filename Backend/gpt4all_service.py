# from flask import Flask, request, jsonify
# from transformers import AutoModelForCausalLM, AutoTokenizer
# import torch
# import warnings

# # Suppress warnings about symlinks
# warnings.filterwarnings("ignore", category=UserWarning)

# app = Flask(__name__)

# # Using a smaller model that works well on most hardware
# MODEL_NAME = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
# DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# try:
#     print("Loading TinyLlama model...")
    
#     # Load tokenizer
#     tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    
#     # Load model with modified settings for better compatibility
#     model = AutoModelForCausalLM.from_pretrained(
#         MODEL_NAME,
#         torch_dtype=torch.float16 if DEVICE == "cuda" else torch.float32,
#         low_cpu_mem_usage=True
#     ).to(DEVICE)
    
#     print(f"Model successfully loaded on {DEVICE.upper()}")
# except Exception as e:
#     print(f"Model loading failed: {str(e)}")
#     model = None

# def generate_mcqs(topic):
#     prompt = f"""Generate exactly 5 professional multiple choice questions about {topic}.
# Format each exactly like this:
# Q1. [Question text]
# a) Option 1
# b) Option 2
# c) Option 3
# d) Option 4
# Answer: [correct letter]

# Example for 'Computer Science':
# Q1. What does CPU stand for?
# a) Central Processing Unit
# b) Computer Processing Unit
# c) Central Process Unit
# d) Computer Primary Unit
# Answer: a

# Now generate 5 questions about {topic}:"""
    
#     inputs = tokenizer(prompt, return_tensors="pt").to(DEVICE)
    
#     # Generate with conservative settings
#     outputs = model.generate(
#         inputs.input_ids,
#         max_new_tokens=512,
#         temperature=0.7,
#         do_sample=True,
#         pad_token_id=tokenizer.eos_token_id
#     )
    
#     return tokenizer.decode(outputs[0], skip_special_tokens=True)

# @app.route('/generate-mcqs', methods=['POST'])
# def handle_generate():
#     if not model:
#         return jsonify({
#             "error": "Model not loaded", 
#             "status": "unavailable",
#             "questions": [
#                 {
#                     "question": "Sample question about " + request.json.get('topic', 'general'),
#                     "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
#                     "answer": "a"
#                 }
#             ]
#         }), 503
    
#     try:
#         topic = request.json.get('topic', 'general knowledge')
#         response = generate_mcqs(topic)
        
#         # Simple parsing of the response
#         questions = []
#         blocks = response.split('Q')[1:6]  # Get first 5 questions
#         for block in blocks:
#             lines = [l.strip() for l in block.split('\n') if l.strip()]
#             if len(lines) >= 6:  # Question + 4 options + answer
#                 questions.append({
#                     "question": lines[0].split('.', 1)[1].strip(),
#                     "options": [opt.split(')', 1)[1].strip() for opt in lines[1:5]],
#                     "answer": lines[5].split(':')[1].strip().lower()
#                 })
        
#         return jsonify({
#             "status": "success",
#             "model": MODEL_NAME,
#             "questions": questions[:5]  # Ensure max 5 questions
#         })
        
#     except Exception as e:
#         print(f"Generation error: {str(e)}")
#         return jsonify({
#             "status": "error",
#             "error": str(e),
#             "questions": [{
#                 "question": "Fallback question about " + request.json.get('topic', 'general'),
#                 "options": ["Option A", "Option B", "Option C", "Option D"],
#                 "answer": "a"
#             }]
#         })

# @app.route('/health', methods=['GET'])
# def health_check():
#     return jsonify({
#         "status": "ready" if model else "offline",
#         "model": MODEL_NAME,
#         "device": DEVICE
#     })                                                                                                                          

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, threaded=True)

# gpt4all_service.py
from flask import Flask, jsonify
from flask_cors import CORS
from gpt4all import GPT4All

app = Flask(__name__)
CORS(app)

# Load the smallest working model (only 2GB RAM needed)
model = GPT4All("orca-mini-3b.gguf", device='cpu')  # Works even on low-end PCs

@app.route('/generate-mcqs', methods=['POST'])
def generate_mcqs():
    topic = request.json.get('topic', 'Python')
    
    prompt = f"""Generate exactly 5 MCQs about {topic} with:
    - 1 correct answer (marked with *)
    - 3 incorrect but plausible options
    Format like this:
    1. What is ___?
    A) Wrong answer
    B) Correct answer*
    C) Wrong answer
    D) Wrong answer"""
    
    response = model.generate(prompt, max_tokens=300)
    return jsonify({"questions": parse_response(response)})

def parse_response(text):
    # Simple parsing logic
    questions = []
    current_q = {}
    for line in text.split('\n'):
        if line.startswith(('1.', '2.', '3.', '4.', '5.')):
            if current_q: questions.append(current_q)
            current_q = {"question": line.split('.', 1)[1].strip(), "options": []}
        elif line.startswith(('A)', 'B)', 'C)', 'D)')):
            current_q["options"].append(line[3:].replace("*", "").strip())
            if "*" in line: current_q["answer"] = len(current_q["options"]) - 1
    return questions

if __name__ == '__main__':
    app.run(port=5001, threaded=True)