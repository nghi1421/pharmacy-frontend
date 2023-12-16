import { useState, useEffect } from 'react';
import { socket } from '../../config/socket';

const Clone = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [joinedRooms, setJoinedRooms] = useState([]);

    const handleLogin = () => {
        socket.emit('login', username);
    };

    const handleMessageSend = () => {
        socket.emit('chat message', username, message);
        setMessage('');
    };

    useEffect(() => {
        socket.on('message', (msg) => {
            setChat((prevChat) => [...prevChat, msg]);
        });

        socket.on('connect_error', data => {
            alert(JSON.stringify(data))
        });

        socket.on('joinedRooms', (rooms) => {
            setJoinedRooms(rooms);
        });

        return () => {
            socket.off('message');
            socket.off('joinedRooms');
        };
    }, []);

    return (
        <div>
            <h1>Chat Clone</h1>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

            <div>
                <h2>Joined Rooms:</h2>
                <ul>
                    {joinedRooms.map((room, index) => (
                        <li key={index}>{room}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Chat:</h2>
                <ul>
                    {chat.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>

            <input
                type="text"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleMessageSend}>Send</button>
        </div>
    );
}

export default Clone