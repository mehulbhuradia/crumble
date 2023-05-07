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


class MagicInput(BaseModel):
    textInput: str
    pageContent: str

@app.post("/api/magic")
async def magic(input_data: MagicInput):
    textInput = input_data.textInput
    pageContent = input_data.pageContent

    try:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"Modify and style the HTML based on the following text:\n{textInput}\n\nAnd the HTML:\n{pageContent}",
            max_tokens=1024,
            n=1,
            temperature=0,
        )
        return response.choices[0].text.strip()
    except Exception as error:
        print("Error in OpenAI API call:", error)
        return {"error": "Error in OpenAI API call"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
