import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShareView({ match }) {
  const [websiteData, setWebsiteData] = useState({ html: '', js: '' });

  useEffect(() => {
    const fetchWebsiteData = async () => {
      const response = await axios.get(`https://api.blazinglyfaster.com/api/${match.params.uuid}`);
      setWebsiteData(response.data);
    };

    fetchWebsiteData();
  }, [match.params.uuid]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: websiteData.html }} />
      {websiteData.js && <script dangerouslySetInnerHTML={{ __html: websiteData.js }} />}
    </div>
  );
}

export default ShareView;