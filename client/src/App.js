import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = input.split(',').map(value => {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? value.trim() : parsed;
    });

    try {
      const response = await axios.post('http://localhost:5000/fizzbuzz', { values });
      setResults(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>FizzBuzz Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter comma-separated values"
            required
          />
          <button type="submit">Submit</button>
        </form>
        <div className="results">
          {results.map((result, index) => (
            <div key={index}>
              {Array.isArray(result.result) ? result.result.map((res, idx) => (
                <p key={idx}>{res}</p>
              )) : (
                <p>{result.result}</p>
              )}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
