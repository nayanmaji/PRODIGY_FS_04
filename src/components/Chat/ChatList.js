import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/chat', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  const renderChatName = (chat) => {
    const loggedInUserId = localStorage.getItem('userId');

    if (chat.inGroupChat) {
      return chat.chatName;
    } else {
      // For one-on-one chats, display the other user's name
      const otherUser = chat.users.find(user => user._id !== loggedInUserId);
      return otherUser ? otherUser.name : 'Unknown User';
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-light mb-4">Chats</h2>
      <div className="bg-dark p-3 rounded">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search or start a new chat" />
          <button className="btn btn-outline-secondary" type="button">🔍</button>
        </div>
        {chats.length > 0 ? (
          <ul className="list-group">
            {chats.map((chat) => (
              <li
                key={chat._id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  chat.inGroupChat ? 'list-group-item-primary' : 'list-group-item-light'
                }`}
                onClick={() => handleChatClick(chat._id)}
                style={{ cursor: 'pointer' }}
              >
                <div>
                  <strong>{renderChatName(chat)}</strong>
                  <p className="mb-0 small text-muted">{chat.latestMessage ? chat.latestMessage.content : 'No messages yet'}</p>
                </div>
                <span className="badge bg-success rounded-pill">1</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="alert alert-info text-center" role="alert">
            No chats available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
