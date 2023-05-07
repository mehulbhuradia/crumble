from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import openai
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv('GPT_API_KEY')

class TextInput(BaseModel):
    textInput: str

@app.post("/api/correct-text")
async def correct_text(input_data: TextInput):
    textInput = input_data.textInput

    try:
        response = openai.Completion.create(
            engine="code-davinci-edit-001",
            prompt=f"Fix the spelling mistakes:\n{textInput}",
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.5,
        )
        return response.choices[0].text.strip()
    except Exception as error:
        print("Error in OpenAI API call:", error)
        return {"error": "Error in OpenAI API call"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
