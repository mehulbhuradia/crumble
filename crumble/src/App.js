import React, { useState, useRef } from "react";
import axios from "axios";

function Crumble() {
  const [textInput, setTextInput] = useState("");
  const [pageContent, setPageContent] = useState("");

  const pageRef = useRef();

  const handleTextSubmit = async () => {
    console.log(`Text input: ${textInput}`);

    try {
      const response = await axios.post(
        "https://api.blazinglyfaster.com/api/magic",
        {
          textInput,
          pageContent, // Add pageContent to the request payload
        }
      );

      console.log("OpenAI Response:", response.data);
      setPageContent(response.data);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  const html = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
      ref={pageRef}
    >
      <label
        htmlFor="textInput"
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        How would you like to change the website?
      </label>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter some text"
          id="textInput"
          style={{
            width: "400px",
            height: "48px",
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleTextSubmit}
          style={{
            marginLeft: "16px",
            width: "120px",
            height: "48px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#6b46c1",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );

  return (
    <>
      {pageContent ? (
        <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      ) : (
        html
      )}
    </>
  );
}

export default Crumble;
