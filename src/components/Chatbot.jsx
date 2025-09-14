import { useEffect } from "react";

export default function Chatbot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "omnidimension-web-widget";
    script.src =
      "https://backend.omnidim.io/web_widget.js?secret_key=e15721a2481fe90dc12dfe82888138c6";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("omnidimension-web-widget");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; 
}
