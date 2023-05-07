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
            prompt=f"Use the following text input: {textInput}\n\nBased on the input, modify and style the HTML below:\n\n{pageContent}\n\nMake sure to keep any existing components unless explicitly mentioned. Here are some specific instructions to follow:\n\n- If the text input contains a specific keyword or phrase, add a new section to the HTML with relevant content.\n- If the text input mentions a specific color or font, change the style of the relevant section(s) in the HTML to match.\n- If the text input suggests a change to an existing component, modify that component as necessary.\n- If the text input suggests removing a component, explicitly state which component(s) should be removed.\n\nBe creative and use your best judgement to create a visually appealing and functional page based on the user's input.",
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
