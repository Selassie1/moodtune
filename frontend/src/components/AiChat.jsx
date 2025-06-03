import React, { useState } from 'react';
import '../styles/aichat.css'
import { BsFillDiscFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";

const AiChat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response || data.error || 'No response');
    } catch (error) {
      console.error(error);
      setResponse('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  // 🔊 Handle Speech Recognition
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Try using Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setMessage(prev => prev ? `${prev} ${speechText}` : speechText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();
  };

  return (
    <div className='container'>
      <h2><span>DJ Tunz</span><BsFillDiscFill /></h2>
      
      <div className='responseBox'>
        <strong>Tunz:</strong> {response}
      </div>

      <div className='inputControls'>
        <textarea
          placeholder="What are you feeling?..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className='textarea'
        />
        <button onClick={handleVoiceInput} className='micButton'>
          <FaMicrophone />
        </button>
      </div>

      <button onClick={sendPrompt} disabled={loading}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
};

export default AiChat;
