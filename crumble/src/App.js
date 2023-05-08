import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ textInput, setTextInput, handleTextSubmit }) => {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Enter some text"
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
      />
      <button
        onClick={handleTextSubmit}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </div>
  );
};

function Crumble() {
  const [textInput, setTextInput] = useState("");
  const [pageContent, setPageContent] = useState("");

  const handleTextSubmit = async () => {
    console.log(`Text input: ${textInput}`);

    try {
      const response = await axios.post(
        // "https://api.blazinglyfaster.com/api/magic",
        "http://localhost:8000/api/magic",
        {
          textInput,
          pageContent,
        }
      );

      console.log("OpenAI Response:", response.data);
      setPageContent(response.data);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  return (
    <>
      <InputForm
        textInput={textInput}
        setTextInput={setTextInput}
        handleTextSubmit={handleTextSubmit}
      />
      <div
        className="space-y-4"
        dangerouslySetInnerHTML={{
          __html: pageContent,
        }}
      />
    </>
  );
}

export default Crumble;

