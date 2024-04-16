import React, { useState } from 'react';
import '/src/screens/css/chatScreen.css';

function ChatInput({ onSend }: { onSend: (message: string) => void }) {
    const [message, setMessage] = useState('');

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSend(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="chat-input">
            <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
}

export function ChatScreen() {
    const [messages, setMessages] = useState<string[]>([]);

    const handleSend = (message: string) => {
        setMessages([...messages, message]);
    };

    return (
        <div className="chat-screen">
            <h1>Chat Screen</h1>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <div className="input-container">
                <ChatInput onSend={handleSend} />
            </div>
        </div>
    );
}
