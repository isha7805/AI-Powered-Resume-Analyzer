import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSkills(response.data.skills);
      setKeywords(response.data.keywords);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>AI Resume Analyzer</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Analyze</button>

      {skills.length > 0 && (
        <div>
          <h3>Extracted Skills:</h3>
          <ul>{skills.map((skill, index) => <li key={index}>{skill}</li>)}</ul>
        </div>
      )}

      {keywords.length > 0 && (
        <div>
          <h3>Extracted Keywords:</h3>
          <ul>{keywords.map((word, index) => <li key={index}>{word}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export default App;
