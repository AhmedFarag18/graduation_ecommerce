import React, { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

function Chat(props) {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [recipient, setRecipient] = useState(null);
    const [message, setMessage] = useState('');

    const hubUrl = '/chat';

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start().then(() => {
                console.log('Connected to SignalR hub');
            }).catch((error) => {
                console.error('Error connecting to SignalR hub:', error);
            });
        }
    }, [connection]);

    useEffect(() => {
        if (connection) {
            connection.on('ReceiveMessage', (message) => {
                setMessages([...messages, message]);
            });
        }
    }, [connection, messages]);

    const sendMessage = async () => {
        await connection.invoke('SendMessage', message, recipient.connectionId);
        setMessage('');
    };

    return (
        <div className="bg-gray-100 p-6">
            <h1>Chat</h1>
            <div>
                <select onChange={(e) => setRecipient(e.target.value)}>
                    <option value="">Choose a recipient</option>
                    {props.users.map((user) => (
                        <option key={user.id} value={user.connectionId}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="bg-main-color text-white" onClick={sendMessage} disabled={!recipient || !message}>
                    Send
                </button>
            </div>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        {message.sender}: {message.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Chat;