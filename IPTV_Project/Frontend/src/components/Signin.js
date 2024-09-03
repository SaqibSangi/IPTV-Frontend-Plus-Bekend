import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';
import { toast, ToastContainer } from 'react-toastify';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMessage(null);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email,
      password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", requestOptions);
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('userToken', result.token);
        toast.success('Sign up successful');
        setTimeout(() => {
          navigate('/genre');
        }, 2000);
      } else {
        setAlertType('error');
        setAlertMessage(result.error || 'Login failed');
      }
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Error during login: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In to your Account</h2>
        <p>Welcome back! Please enter your details.</p>
        <form className="auth-form" onSubmit={handleSignIn}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
            {/* <a href="#" className="forgot-password">Forgot Password?</a> */}
          </div>
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? <LoadingIndicator /> : 'Log in'}
          </button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </div>
      <ToastContainer /> {/* Include the ToastContainer */}
    </div>
  );
};

export default SignIn;
