import React, { useState } from "react";
import axios from "axios";
import JankyScript from './JankyScript';


const InputForm = ({ textInput, setTextInput, handleTextSubmit }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "18vh",
      }}
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
};

function Crumble() {
  const [textInput, setTextInput] = useState("");
  const [pageContent, setPageContent] = useState(
    "<!DOCTYPE html><html>  <head>  </head>  <body>  </body></html>"
  );

  const handleTextSubmit = async () => {
    console.log(`Text input: ${textInput}`);

    try {
      const response = await axios.post(
        "https://api.blazinglyfaster.com/api/magic",
        // "http://localhost:8000/api/magic",
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
    setTextInput("");
  };

  return (
    <>
      <JankyScript adCode="(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5935568,document.body||document.documentElement)"/>
      <JankyScript async = {true} dcfa = {true} adCode={""} src="https://ptauxofi.net/pfe/current/tag.min.js?z=5935593"/>
      <InputForm
        textInput={textInput}
        setTextInput={setTextInput}
        handleTextSubmit={handleTextSubmit}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: pageContent,
        }}
      />
    </>
  );
}

export default Crumble;
