import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Message from './Message';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatWindow = () => {
  const { chatId } = useParams(); // Get chatId from URL params
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  // Fetch messages for the current chat
  const fetchMessages = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:5000/api/message/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Send a message to the chat
  const sendMessage = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const messageData = {
      content,
      chatId, // Use the chatId from URL params
    };
    try {
      const response = await axios.post('http://localhost:5000/api/message', messageData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Message sent:', response.data); // Handle the response
      setMessages((prevMessages) => [...prevMessages, response.data]); // Add the new message to the messages state
      setContent(''); // Clear the input field after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Chat</h2>
      <div className="messages p-3 bg-light border rounded" style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg) => (
          <Message key={msg._id} message={msg} />
        ))}
      </div>
      <form onSubmit={sendMessage} className="mt-3">
        <div className="input-group">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            placeholder="Type a message"
          />
          <button type="submit" className="btn btn-success">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
