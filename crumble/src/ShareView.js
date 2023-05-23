import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import JankyScript from './JankyScript';
import Spinner from './Spinner';

function ShareView() {
  const [websiteData, setWebsiteData] = useState({ page: ''});
  const [jsCode, setJsCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { uuid } = useParams();

  useEffect(() => {
    const fetchWebsiteData = async () => {
        setIsLoading(true)
        
        const response = await axios.get(
          `https://api.blazinglyfaster.com/api/find?site_id=${uuid}`
          // `http://localhost:8000/api/find?site_id=${uuid}`
        );
        console.log(response.data.content)
      setIsLoading(false)
      const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
      const scriptContent = [];
      response.data.content.replace(
        scriptRegex,
        function (fullMatch, scriptContentMatch) {
          scriptContent.push(scriptContentMatch.trim());
        }
      );
      setJsCode(scriptContent[0]);

      setWebsiteData(response.data.content);
    };

    fetchWebsiteData();
  }, []);

  return (
    <div>
        <JankyScript adCode={jsCode}/>
        <Spinner isLoading={isLoading}/>
      <div dangerouslySetInnerHTML={{ __html: websiteData }} />
      {jsCode && <script dangerouslySetInnerHTML={{ __html: jsCode }} />}
    </div>
  );
}

export default ShareView;