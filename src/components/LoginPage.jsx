// import React from 'react';
// import './LoginPage.css';
// import WhatsappLogo from "../pages/WhatsApp-logo.png";
// import dataIcon from "../pages/data-icon.jpeg";
// import qrCode from "../pages/qrcode.png"; 
// import dottedLine from '../pages/dotted_line.webp';
// import settingIcon from '../pages/settings.png';
// const LoginPage = () => {


//   return (
//     <div className="login-container">
//         <div className="top-section">
//        <div> <img className="logo" src={WhatsappLogo} alt="WhatsApp logo" /> </div>
//         <div className="text">Whatsapp Web</div>
//       </div>
//       <div className="bottom-section">
//         <div className="box">
//           <img className="qr-code" src={qrCode} alt="QR code" /> s
//         </div>
//         <div className='header'>
//           <img className='data_icon' src={dataIcon} alt="data icon" />
//           <div className='data_sub_text'>Download WhatsApp for Windows</div>
//           <div className='sub_text'>Get calling, screen sharing and a faster experience with the new Windows app.</div>
//           <div className='get'>Get the app</div>
//         </div>
//         <div className='header_text'>Use WhatsApp on your computer</div>
//         <div className='header_sub_text'>
//           <ol>
//             <li>Open WhatsApp on your phone</li>
//             <li>Tap <b>Menu</b> <img className='dotted' src={dottedLine} alt="dotted"/> 
//                         on Android, or <b>Settings</b> <img className='settingIcon' src={settingIcon} alt="settingIcon"/> on iPhone</li>
//             <li>Tap <b>Linked devices</b> and then <b>Link a device</b></li>
//             <li>Point your phone at this screen to capture the QR code</li>
//           </ol>
//         </div>
//         <div className='line' />
//         <div className='link_text'>Link with phone number</div>
//         <div className='landing_title'>Tutorial</div>
//         <div className='landing_subtitle'>Need help to get started?
//         </div>
//         <video className='tutorial-video' controls>
//             <source src="https://static.whatsapp.net/rsrc.php/yk/r/GoZyw2bTK6s.mp4" type="video/mp4" />
//           </video>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import React from 'react';
// import './LoginPage.css';

// const LoginPage = () => {
//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form>
//           <div className="input-group">
//             <label htmlFor="username">Username</label>
//             <input type="text" id="username" name="username" required />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" name="password" required />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const validCredentials = {
    username: 'arthiswarip1@gmail.com',
    password: 'password123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === validCredentials.username && password === validCredentials.password) {
      navigate('/web.whatsapp.com');
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


