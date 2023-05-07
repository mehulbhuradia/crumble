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

    prompt = f"""
        Use the following text input: {textInput}

        Based on the input, modify and style the HTML below:

        {pageContent}

        Make sure to keep the textbox and the submit button unless the text input explicitly suggests removing them. However, you may modify their style based on the input.

        Here are some specific instructions to follow:

        - If the text input contains a specific keyword or phrase, add a new section to the HTML with relevant content.
        - If the text input mentions a specific color or font, change the style of the relevant section(s) in the HTML to match.
        - If the text input suggests a change to an existing component, modify that component as necessary.
        - If the text input suggests removing a component, explicitly state which component(s) should be removed.

        Be creative and use your best judgement to create a visually appealing and functional page based on the user's input. Note that if the word "exit" is used in the input, the application should terminate.
        """
    try:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
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
