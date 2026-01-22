import React, { useState } from 'react';
import axios from 'axios';

// ISSUE 1: Hardcoded API key
const API_KEY = 'sk-1234567890abcdef';
const API_URL = 'https://api.example.com';

function AuthComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // ISSUE 2: Storing password in state (plain text)
  const handleLogin = async () => {
    // ISSUE 3: No input validation
    const response = await axios.post(`${API_URL}/login`, {
      username: username,
      password: password,
      api_key: API_KEY
    });

    // ISSUE 4: Storing sensitive data in localStorage
    localStorage.setItem('user_token', response.data.token);
    localStorage.setItem('user_password', password);

    // ISSUE 5: Using eval on user input
    const result = eval(username);

    // ISSUE 6: XSS vulnerability
    document.getElementById('welcome').innerHTML = `Welcome ${username}!`;
  };

  // ISSUE 7: No error handling
  return (
    <div>
      <input 
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <div id="welcome"></div>
    </div>
  );
}

export default AuthComponent;
