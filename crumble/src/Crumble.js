import React, { useState } from "react";
import axios from "axios";
import JankyScript from "./JankyScript";
import Spinner from "./Spinner";
import { FaShareSquare } from 'react-icons/fa';

const ShareButton = ({ handleShare }) => (
  <button
    onClick={handleShare}
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
    // style={{
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   marginTop: "16px",
    //   width: "120px",
    //   height: "48px",
    //   fontSize: "16px",
    //   fontWeight: "bold",
    //   color: "#fff",
    //   backgroundColor: "#6b46c1",
    //   border: "none",
    //   borderRadius: "4px",
    //   cursor: "pointer",
    // }}
  >
    <FaShareSquare style={{ marginRight: '8px' }} />
    Share
  </button>
);

const InputForm = ({ textInput, setTextInput, handleTextSubmit, handleShare }) => {
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTextSubmit();
            }
          }}
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
        <ShareButton handleShare={handleShare}/>
      </div>
    </div>
  );
};


function Crumble() {
  const [textInput, setTextInput] = useState("");
  const [pageContent, setPageContent] = useState(
    "<!DOCTYPE html><html>  <head>  </head>  <body>  </body></html>"
  );
  const [jsCode, setJsCode] = useState(null);
  const [shareLink, setShareLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextSubmit = async () => {
    console.log(`Text input: ${textInput}`);

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.blazinglyfaster.com/api/magic",
        // "http://localhost:8000/api/magic",
        {
          textInput,
          pageContent,
        }
      );
      setIsLoading(false);
      console.log("OpenAI Response:", response.data);
      setPageContent(response.data);
      const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
      const scriptContent = [];
      response.data.replace(
        scriptRegex,
        function (fullMatch, scriptContentMatch) {
          scriptContent.push(scriptContentMatch.trim());
        }
      );
      setJsCode(scriptContent[0]);
    } catch (error) {
      console.error("Error in API call:", error);
    }
    setTextInput("");
  };

  const handleShare = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post('https://api.blazinglyfaster.com/api/store', { html: pageContent});
      setIsLoading(false)
      const uuid = response.data;
      const newLink = `https://blazinglyfaster.com/${uuid}`;
      setShareLink(newLink);

      // Copy to clipboard
      navigator.clipboard.writeText(newLink);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <JankyScript adCode="(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5935568,document.body||document.documentElement)" />
      <JankyScript
        async={true}
        dcfa={true}
        adCode={""}
        src="https://ptauxofi.net/pfe/current/tag.min.js?z=5935593"
      />
      {jsCode && <JankyScript adCode={jsCode} />}
      <div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <InputForm
            textInput={textInput}
            setTextInput={setTextInput}
            handleTextSubmit={handleTextSubmit}
            handleShare={handleShare}
          />
          <Spinner isLoading={isLoading}/>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: pageContent,
          }}
        />
      </div>
    </>
  );
}

export default Crumble;
