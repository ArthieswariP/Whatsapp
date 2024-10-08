import React, { useState } from 'react';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
import './ChatPage.css';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="chat-page-container">
      <LeftContainer setSelectedChat={setSelectedChat} />
      <RightContainer selectedChat={selectedChat} />
    </div>
  );
};

export default ChatPage;
