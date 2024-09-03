import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import './index.css';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import FileManager from './components/FileManager';
import Series from './components/Series';
import Seasons from './components/Seasons';
import Episodes from './components/Episodes';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const isAuthRoute = location.pathname === '/' || location.pathname === '/signin';

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [location.pathname]); // Run effect on route change

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={isAuthRoute ? '' : 'app-container'}>
      <div className={isAuthRoute ? '' : 'content-container'}>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/genre" element={<Home />} />
          <Route path="/series" element={<Series />} />
          <Route path="/seasons" element={<Seasons />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/thumnails" element={<FileManager />} />
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
