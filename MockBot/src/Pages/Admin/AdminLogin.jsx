import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'Mary123' && password === 'M@ry123') {
      navigate('/admin'); // Redirect to /admin page
    } else {
      setError('Invalid username or password.'); // Show error message
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginContainer}>
        <h1 style={styles.header}>Admin Portal</h1>
        <p style={styles.tagline}>Welcome back! Please log in to continue.</p>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <div style={styles.footer}>
          <a href="#" style={styles.footerLink}>
            Forgot Password?
          </a>
          <p style={styles.footerText}>© 2023 Admin Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loginContainer: {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  header: {
    color: '#5D009F',
    marginBottom: '10px',
  },
  tagline: {
    color: '#666666',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #DDDDDD',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#5D009F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#5A52E0',
  },
  errorMessage: {
    color: '#FF4D4D',
    marginTop: '10px',
  },
  footer: {
    marginTop: '20px',
    color: '#999999',
    fontSize: '14px',
  },
  footerLink: {
    color: '#6C63FF',
    textDecoration: 'none',
  },
  footerLinkHover: {
    textDecoration: 'underline',
  },
  footerText: {
    marginTop: '10px',
  },
};

export default LoginScreen;