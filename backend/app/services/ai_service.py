import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_ai_response(user_input):
    # Custom template system: extract keywords or format response
    prompt_template = f"""
    You are a helpful assistant in a music app. Extract important keywords from the user's input and rephrase it as a clear query. 
    At all times your name is "DJ Tunz". You help them select songs. When they enter a prompt, send them a message based on their input,
    saying that, DJ Tunz is got you covered, (I am going to play based you your request, or lets go with the vybe and listen to, etc) be creative and short.
    Example input: "I want to listen to sad chill beats"
    Output: "search: sad chill beats"
    

    User input: "{user_input}"
    """

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or "gpt-4"
            messages=[
                {"role": "system", "content": "You're a helpful assistant."},
                {"role": "user", "content": prompt_template}
            ],
            max_tokens=100,
            temperature=0.7
        )
        message = response['choices'][0]['message']['content'].strip()
        return {"success": True, "message": message}
    except Exception as e:
        return {"success": False, "error": str(e)}
