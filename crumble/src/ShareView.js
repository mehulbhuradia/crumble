import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JankyScript from './JankyScript';

function ShareView({ match }) {
  const [websiteData, setWebsiteData] = useState({ page: ''});
  const [jsCode, setJsCode] = useState({ js: ''});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchWebsiteData = async () => {
        setIsLoading(true)
      const response = await axios.get(`https://api.blazinglyfaster.com/api/find?siteId=${match.params.uuid}`);
      setIsLoading(false)
      const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
      const scriptContent = [];
      response.data.replace(
        scriptRegex,
        function (fullMatch, scriptContentMatch) {
          scriptContent.push(scriptContentMatch.trim());
        }
      );
      setJsCode(scriptContent[0]);

      setWebsiteData(response);
    };

    fetchWebsiteData();
  }, [match.params.uuid]);

  return (
    <div>
        <JankyScript adCode={jsCode}/>
        <Spinner isLoading={isLoading}/>
      <div dangerouslySetInnerHTML={{ __html: websiteData.html }} />
      {websiteData.js && <script dangerouslySetInnerHTML={{ __html: websiteData.js }} />}
    </div>
  );
}

export default ShareView;