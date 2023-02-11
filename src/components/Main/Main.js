import React from "react";
import { useState } from "react";
import "../Main/Main.css";
import { Configuration, OpenAIApi } from "openai";
import loader from "../../img/loader.gif";

const Main = () => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const disabled = !prompt;
  const handleClick = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      console.log(response)
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <div className="main">
      <div id="container">
        <textarea
          type="text"
          id="textarea"
          value={prompt}
          placeholder="What's your Question ?"
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        {loading ? (
          <img  id="loader" src={loader} height={200} width={200} />
        ) : (
          <button id="button" onClick={handleClick} disabled={disabled}>
            {/* {loading ? "Generating......" : "Generate"} */}
            Generate
          </button>
        )}

        <pre id="content">{result}</pre>
      </div>
    </div>
  );
};

export default Main;
