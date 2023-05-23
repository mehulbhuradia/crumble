from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import openai
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import pymongo
from bson.objectid import ObjectId

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

client = pymongo.MongoClient(os.getenv('MONGO_URI'))
db_list = client.list_database_names()

db_name = os.getenv('DATABASE_NAME')
# Check if the database already exists
if db_name in db_list:
    db = client.db_name
    print("The database already exists.")
else:
    # Create a new database
    db = client[db_name]
    print("The database has been created.")

class MagicInput(BaseModel):
    textInput: str
    pageContent: str

@app.post("/api/magic")
async def magic(input_data: MagicInput):
    textInput = input_data.textInput
    pageContent = input_data.pageContent    
    gpt_prompt = f"""HTML:

    {pageContent}

    Input:

    {textInput}

    Based on the input, please modify the HTML as follows:
    - Only return HTML code as the output.
    - If the text input contains a specific keyword or phrase, add a new section to the HTML with relevant content.
    - If the text input mentions a specific color or font, change the style of the relevant section(s) in the HTML to match.
    - If the text input suggests a change to an existing component, modify that component as necessary.
    - If the text input suggests removing a component, explicitly state which component(s) should be removed.

    Be creative and use your best judgement to create a visually appealing and functional page based on the user's input. CODE ONLY"""
    message=[{"role": "user", "content": gpt_prompt}]
    try:
        response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages = message,
        temperature=0.2,
        max_tokens=1000,
        frequency_penalty=0.0
        )
        return response.choices[0].message.content
    except Exception as error:
        print("Error in OpenAI API call:", error)
        return {"error": "Error in OpenAI API call"}

class SaveInput(BaseModel):
    pageContent: str

@app.post("/api/save")
async def magic(input_data: SaveInput):

    # insert the page content into the database
    page_id = db.pages_collection.insert_one({"content": input_data.pageContent}).inserted_id
    
    # return the database id as a string
    return str(page_id)

@app.get("/api/find")
async def get_page_content(site_id: str = Query(...)):

    # find the page with the given ID in the database
    page = db.pages_collection.find_one({"_id": ObjectId(site_id)})
    
    # if the page is not found, return an error message
    if page is None:
        return {"error": "Page not found"}
    
    # if the page is found, return its content
    return {"content": page["content"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
