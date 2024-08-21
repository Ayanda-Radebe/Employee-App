// src/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Import your CSS file for styling

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple login logic (you can expand this later)
        if (email === 'admin@example.com' && password === 'password') {
            onLogin(true);
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Welcome!</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
      
    );
};

export default LoginPage;
