import React from 'react'
import { useState } from 'react';
import { FiSend, FiMic, FiSearch } from 'react-icons/fi';
import '../styles/welcome.css'
import logo from '../assets/logo/horizontal-rgb.png';
import Spline from '@splinetool/react-spline';

const Welcome = () => {
    const [inputValue, setInputValue] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
        console.log('Submitted:', inputValue);
        // Add your submission logic here
        setInputValue('');
        }
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
        // Add your audio recording logic here
        console.log(isRecording ? 'Stopped recording' : 'Started recording');
    };
    return (
        <div className="welcome-container">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="intro-msg">
                <h1>Soundtrack your life effortlessly!</h1>
                <p>"No skips, just hits."</p>
            </div>
            <div className="chat-sec">
                <div className="prompt-container">
                    <form onSubmit={handleSubmit} className="prompt-form">
                        <div className="input-wrapper">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder=""
                            className="prompt-input"
                        />
                        {!inputValue && (
                            <div className="placeholder-hint">
                            <FiSearch className="search-icon" />
                            <span>What mood are you in right now?</span>
                            </div>
                        )}
                        </div>
                        
                        <div className="button-group">
                        <button
                            type="button"
                            onClick={toggleRecording}
                            className={`audio-button ${isRecording ? 'recording' : ''}`}
                            aria-label="Audio input"
                        >
                            <FiMic />
                        </button>
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="send-button"
                            aria-label="Send message"
                        >
                            <FiSend />
                        </button>
                        </div>
                    </form>
                </div>
                <div className="quick">
                    <button className="rock">Suprise me</button>
                    <button className="jazz">Gospel</button>
                    <button className="pop">Afro Beats</button>
                    <button className="rock">Amapiano</button>
                </div>
            </div>
            <div className="three-d">
                <Spline scene="https://prod.spline.design/QIXuTzdx9cD7Nw9U/scene.splinecode" />
            </div>
            
            <button className="welcome-button">Get started</button>
        </div>
    )
}

export default Welcome;