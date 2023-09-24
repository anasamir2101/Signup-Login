// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

function App() {
  const [username, setusername] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setusername(user.displayName);
      } else {
        setusername('');
      }
    });
  }, []);
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Profile username={username} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
