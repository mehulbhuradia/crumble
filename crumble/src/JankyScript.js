import { useEffect } from "react";

const JankyScript = ({ adCode, src, async, dcfa }) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.innerHTML = adCode;
    script.async = async == null ? false : async;
    if (src != null) {
      script.src = src;
    }
    script["data-cfasync"] = dcfa == null ? false : dcfa;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [adCode, src, async, dcfa]);

  return null;
};

export default JankyScript;
