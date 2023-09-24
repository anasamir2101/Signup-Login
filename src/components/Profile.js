import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Profile = (props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const username = props.username;
  const email = auth.currentUser?.email;

  return (
    <div className='flex justify-center items-center h-screen bg-orange-600'>
      <div className='bg-white p-6 rounded-lg shadow-md w-96 text-center'>
        <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
          {username ? (
            `Welcome, ${username}`
          ) : (
            <Link to='/signup'>Sign Up</Link>
          )}
        </h2>
        {username && (
          <div>
            <p className='text-xl text-gray-600 mb-2'>Username: {username}</p>
            <p className='text-xl text-gray-600 mb-2'>Email: {email}</p>
            <button
              onClick={handleLogout}
              className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg focus:outline-none'
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
