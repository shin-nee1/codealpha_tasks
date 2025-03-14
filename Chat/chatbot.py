from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load a small AI model from Hugging Face
chat_model = pipeline("text-generation", model="microsoft/DialoGPT-small")

# Predefined chatbot responses
responses = {
    "hello": "Hi there! How can I help you?",
    "hi": "Hello! How's your day going?",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "what's your name": "I'm your AI Chatbot! 😊",
    "bye": "Goodbye! Have a great day!",
    "who are you": "I'm your friendly AI chatbot!",
    "tell me a joke": "Why don't scientists trust atoms? Because they make up everything! 😂",
    "thank you": "You're very welcome! 😊"
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "").lower()

    # Check predefined responses first
    if user_message in responses:
        response = responses[user_message]
    else:
        # Use AI model for generating a response
        ai_response = chat_model(user_message, max_length=50, num_return_sequences=1)
        response = ai_response[0]["generated_text"]

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
