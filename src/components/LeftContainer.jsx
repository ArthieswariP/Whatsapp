import React, { useState, useEffect } from 'react';
import './LeftContainer.css';
import searchIcon from '../pages/searchIcon.svg';
import chatData from '../leftData.json';

const formatTime = (time) => {
  return time.toLowerCase() === "yesterday" ? "Yesterday" : time;
};

const LeftContainer = ({ setSelectedChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState(chatData.chats);
  const [filteredChats, setFilteredChats] = useState(chatData.chats);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter(chat =>
        chat.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.messages[0].message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formatTime(chat.messages[0].time).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchQuery, chats]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="left-container">
      <div className='top_container'>Profile Page</div>
      <div className='search-container'>
        <input
          className='searchbar'
          type='search'
          placeholder='Search or type to search'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <img className='search-icon' src={searchIcon} alt="Search icon" />
      </div>
      <div className='chat-list'>
        {filteredChats.map((chat, index) => (
          <div key={index} className='chat-item' onClick={() => handleChatClick(chat)}>
            <div className='chat-header'>
              <div className='profile_url' href={chat.profile.profile_url}></div>
              <div className='profileName'>{chat.profile.name}</div>
              <span className='time'>{formatTime(chat.messages[0].time)}</span>
            </div>
            <div className='chat-body'>
              <p className='message'>{chat.messages[0].message}</p>
              <div className='message-count'>{chat.message_count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftContainer;
