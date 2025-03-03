import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const App = () => {
  const [topic, setTopic] = useState("");
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setArticle("");

    try {
      const response = await fetch("http://localhost:4000/generate-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (data.success) {
        setArticle(data.markdown);
      } else {
        setError("Failed to generate newsletter.");
      }
    } catch (err) {
      setError("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h1>AI Newsletter Generator</h1>
      <input
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ width: "80%", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Newsletter"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {article && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h2>Generated Newsletter:</h2>
          <div
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              background: "#f9f9f9",
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => <h1 style={{ fontSize: "24px", fontWeight: "bold" }} {...props} />,
                h2: ({ node, ...props }) => <h2 style={{ fontSize: "20px", fontWeight: "bold" }} {...props} />,
                h3: ({ node, ...props }) => <h3 style={{ fontSize: "18px", fontWeight: "bold" }} {...props} />,
                a: ({ node, ...props }) => (
                  <a target="_blank" style={{ color: "blue", textDecoration: "underline" }} {...props} />
                ),
                strong: ({ node, ...props }) => <strong style={{ fontWeight: "bold" }} {...props} />,
              }}
            >
              {article}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
