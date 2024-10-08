import React, { useState, useEffect } from 'react';
import './RightContainer.css';
import smileLogo from '../pages/smileLogo-com.svg';
import voiceIcon from '../pages/microphone.svg';
import sendIcon from '../pages/send.png';
import attach from '../pages/attach.png';
import Download_Icon from '../pages/download_icon.jfif';
import EmojiPicker from 'emoji-picker-react';
import RecordRTC from 'recordrtc';

function RightContainer({ selectedChat }) {
  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState('');
  const [showMic, setShowMic] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    return () => {
      if (recorder) {
        recorder.stopRecording();
      }
    };
  }, [recorder]);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  const startRecording = async () => {
    setShowMic(true);
    setRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = RecordRTC(stream, { type: 'audio' });
      setRecorder(newRecorder);
      newRecorder.startRecording();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioURL = URL.createObjectURL(recorder.getBlob());
        setAudioURL(audioURL);
      });
      setRecording(false);
      setShowMic(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setText(text + emojiObject.emoji);
    setShowPicker(false);
  };

  const handleVoiceClick = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSendClick = () => {
    const newMessage = {
      message: text || null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      audioURL: audioURL || null,
      file: selectedFile || null,
    };

    setText('');
    setAudioURL('');
    setSelectedFile(null);
    
    setMessages([...messages, newMessage]);
    setShowMic(false);
  };

  const handleAttachClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setText(file.name); // Set the text to the file name
    }
  };

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop(); // Use the last part of the URL as the filename
    document.body.appendChild(link);
    link.click(); // Simulate a click on the link
    document.body.removeChild(link); // Clean up
  };

  return (
    <div className="right-container">
  <div className="top">{selectedChat ? selectedChat.profile.name : 'Select a chat'}</div>
  <div className="center">
    <div className="messages">
      {messages.map((msg, index) => (
        <div key={index} className={`message`}>
          {msg.message && <p>{msg.message}</p>}
          {msg.audioURL && (
            <div>
              <audio controls src={msg.audioURL}></audio>
              <img
                className="Download_Icon"
                src={Download_Icon}
                alt="Download"
                onClick={() => handleDownload(msg.audioURL)}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              />
            </div>
          )}
          {msg.file && (
            <div className="file-attachment">
              <span>{msg.file.name}</span>
              {msg.file.type.startsWith('image/') && (
                <div>
                  <img
                    src={URL.createObjectURL(msg.file)}
                    alt="attachment"
                    style={{ width: '200px', height: '200px' }}
                  />
                  <img
                    className="Download_Icon"
                    src={Download_Icon}
                    alt="Download"
                    onClick={() => handleDownload(URL.createObjectURL(msg.file))}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                </div>
              )}
              {msg.file.type.startsWith('video/') && (
                <video controls src={URL.createObjectURL(msg.file)} style={{ width: '200px', height: '200px' }} />
              )}
              {msg.file.type.startsWith('application/pdf') && (
                <img
                  className="Download_Icon"
                  src={Download_Icon}
                  alt="Download"
                  onClick={() => handleDownload(URL.createObjectURL(msg.file))}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
              )}
            </div>
          )}
          <span className="time">{msg.time}</span>
        </div>
      ))}
        </div>
      </div>
      <div className="middle">
        <input
          className="field"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={selectedFile ? 'Type a message or send file...' : 'Type a message'}
        />
        <img
          className="logo"
          src={smileLogo}
          alt="Emoji picker"
          onClick={() => setShowPicker(!showPicker)}
        />
        <img
          className='attach'
          src={attach}
          alt="attach"
          onClick={handleAttachClick}
        />
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <img
          className="voice-Icon"
          src={voiceIcon}
          alt="Voice message"
          onClick={handleVoiceClick}
        />
        <img
          className="send"
          src={sendIcon}
          alt="Send message"
          onClick={handleSendClick}
        />
        {showPicker && (
          <div className="picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        {showMic && audioURL && (
          <div className="mic-container">
            <audio controls src={audioURL}></audio>
            <img
              className="Download_Icon"
              src={Download_Icon}
              alt="Download"
              onClick={() => handleDownload(audioURL)} // Call handleDownload for the recorded audio
              style={{ cursor: 'pointer', marginLeft: '10px' }} // Optional styling
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default RightContainer;
