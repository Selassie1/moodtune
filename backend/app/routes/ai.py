# backend/app/routes/ai.py

from flask import Blueprint, request, jsonify
import openai
import os

from openai import OpenAI  # Use the new client

ai_bp = Blueprint('ai', __name__)

# Setup client with your key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "sk-your-key"))

@ai_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('message', '')

    if not user_input:
        return jsonify({"error": "No input message provided"}), 400

    try:
        # Craft a system prompt to generate both a response and a keyword
        system_prompt = (
            "You're a music mood assistant, your name is 'DJ Tunz'. When a user shares how they feel or describes a mood, "
            "you must respond in two parts:\n"
            "1. A friendly message back to the user (1-2 lines max).\n"
            "2. A distilled keyword or mood phrase on a new line labeled as: KEYWORDS: <mood/genre>\n"
            "Example:\n"
            "\"I got you, let's play something uplifting to boost your mood!\"\n"
            "KEYWORDS: happy music"
        )

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input},
            ],
            max_tokens=150,
            temperature=0.7,
        )

        message = response.choices[0].message.content.strip()

        # Extract the two parts
        if "KEYWORDS:" in message:
            parts = message.split("KEYWORDS:")
            friendly_response = parts[0].strip()
            keywords = parts[1].strip()
        else:
            friendly_response = message
            keywords = ""

        return jsonify({
            "response": friendly_response,
            "keywords": keywords
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
