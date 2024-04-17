import React, {ReactNode, useEffect, useState} from 'react';
import {useSocket} from "../providers/SocketProvider";
import './styles/chatScreen.css';

function ChatInput({onSend}: { onSend: (message: string) => void }) {
    const [message, setMessage] = useState('');
    const socket = useSocket();


    return (
        <form
            className="chat-input"
            onSubmit={(event) => {
                event.preventDefault();
                socket.send({ type: "chat-message", content: message });
                setMessage('');
            }}
        >
            <input
                value={message}
                onChange={(event) => setMessage(event.currentTarget.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
}

function Message({children} : {children: ReactNode}) {
    return <p>{children}</p>;
}

function isChatEvent(
    event: unknown
): event is { type: "chat-message"; content: string } {
    return (
        typeof event === "object" &&
        event !== null &&
        "type" in event &&
        typeof (event as { type: unknown }).type === "string" &&
        (event as { type: unknown }).type === "chat-message"
    );
}

function MessageList() {
    const [messages, setMessages] = useState([
        {id: 1, author: 'Benji', content: 'Hello'},
        {id: 2, author: 'Evan', content: 'How are you?'},
    ]);

    const socket = useSocket();
    useEffect(() => socket.onMessage((message) => {
        if (!isChatEvent(message)) {
            return;
        }
        setMessages((messages) => [
            ...messages,
            {id: messages.length + 1, author: '', content: message.content},
        ]);
    }), [socket]);

    return (
        <div>
            {messages.map((message) => (
                <Message key={message.id}>{message.content}</Message>
            ))}
        </div>
    );
}

export function ChatScreen() {
    return (
        <div className="chat-container">
            <MessageList />
            <ChatInput onSend={(message) => console.log(message)} />
        </div>
    );
}