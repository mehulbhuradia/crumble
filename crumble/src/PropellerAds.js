import React, { useEffect } from 'react';

const PropellerAds = ({ adCode, src, async, dcfa }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = adCode;
    script.async = (async == null) ? false:async;
    // script.src = (src == null) ? "":src;
    if(src != null) {script.src = src}
    script["data-cfasync"] = (dcfa == null) ? false:dcfa;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [adCode, src, async, dcfa]);

  return null;
};

export default PropellerAds;
