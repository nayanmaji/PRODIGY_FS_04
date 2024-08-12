import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="message">
      <strong>{message.sender.name}: </strong>
      <span>{message.content}</span>
    </div>
  );
};

export default Message;
