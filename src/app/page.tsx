"use client"; // This is a client component

import { useState } from 'react';

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSend = async () => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "HTTP-Referer": `http://localhost:3000`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "messages": [...messages, { role: "user", content: inputValue }]
      })
    });
    const data = await response.json();
    setMessages([...messages, { role: "user", content: inputValue }, { role: "assistant", content: data.choices[0].message.content }]);
    setInputValue('');
  };

  const handleReset = () => {
    setMessages([]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ height: '80vh', overflowY: 'auto' }}>
        {messages.map((message, idx) => (
          <div key={idx} style={{ marginBottom: '10px', textAlign: message.role === 'user' ? 'right' : 'left' }}>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', display: 'flex' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ flex: 1, marginRight: '10px' }}
        />
        <button onClick={handleSend}>Send</button>
        <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
      </div>
    </div>
  )
}

export default Home;
