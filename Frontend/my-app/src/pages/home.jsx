
import React, { useContext, useState, useEffect } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Clock, LogOut, History, Video } from 'lucide-react';
import "../App.css";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleJoinVideoCall = async () => {
    if (meetingCode.trim()) {
      await addToUserHistory(meetingCode);
      navigate(`/${meetingCode}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleJoinVideoCall();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <div className="home-container">
      <div className="nav-container">
        <motion.div 
          className="logo-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="logo">PrivCom</h1>
          <div className="time-display">
            <Clock size={16} />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </motion.div>
        
        <div className="nav-buttons">
          <motion.button 
            className="nav-button history-button"
            onClick={handleHistory}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <History size={20} />
            <span>History</span>
          </motion.button>
          
          <motion.button 
            className="nav-button logout-button"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      <motion.div 
        className="content-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.div 
          className="tagline-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h2 className="tagline">For Organizations. For Teams.</h2>
          <h3 className="sub-tagline">What's Internal Stays Internal</h3>
          
          <motion.div 
            className="pulse-circle"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </motion.div>

        <motion.div 
          className="join-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="input-container">
            <input
              type="text"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Meeting Code"
              className="meeting-input"
            />
            
            <motion.button
              className="join-button"
              onClick={handleJoinVideoCall}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!meetingCode.trim()}
            >
              <Video size={20} />
              <span>Join</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="floating-elements"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </motion.div>
    </div>
  );
}

export default withAuth(HomeComponent);