// export default Signup;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase';

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [button, setButton] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!values.username || !values.email || !values.password) {
      setError('All fields are required!');
      return;
    }

    // Check if the username is already taken
    const usernameExists = await checkUsernameExists(values.username);

    if (usernameExists) {
      setError('Username is already taken');
      return;
    }

    setError('');
    setButton(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = response.user;

      // Update user profile with the provided username
      await updateProfile(user, {
        displayName: values.username,
      });

      navigate('/login');
      console.log(user);
    } catch (error) {
      setButton(false);

      // Handle different authentication errors
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use. Please use a different email.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError('An error occurred. Please try again later.');
        console.error(error);
      }
    }
  };

  const checkUsernameExists = async (username) => {
    const usernameRef = collection(firestore, 'users'); // Use 'collection' from Firestore
    const q = query(usernameRef, where('username', '==', username)); // Use 'query' and 'where'

    const snapshot = await getDocs(q); // Use 'getDocs' to fetch data
    return !snapshot.empty;
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-orange-600'>
      <div className='bg-white p-4 md:p-8 shadow-md rounded-lg w-[300px] sm:w-[450px]'>
        <h1 className='text-2xl font-semibold mb-4 text-left'>Signup</h1>
        <form>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-left font-bold my-2 text-gray-600'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400'
              placeholder='Enter your username'
              onChange={(e) => {
                setValues((prev) => ({ ...prev, username: e.target.value }));
              }}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-left font-bold my-2 text-gray-600'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400'
              placeholder='Enter your Email'
              onChange={(e) => {
                setValues((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-left font-bold my-2 text-gray-600'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400'
              placeholder='Enter your password'
              onChange={(e) => {
                setValues((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
          </div>
          <p className='font-bold text-black'>{error}</p>
          <button
            type='button'
            className='w-full my-2 md:my-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none'
            onClick={handleSignup}
            disabled={button}
          >
            Sign up
          </button>
        </form>
        <div className='flex'>
          <p className='font-bold'>Already have an account?</p>
          <Link
            className='mx-1 text-orange-400 hover:text-orange-500 hover:border-b-4 border-orange-600'
            to='/login'
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
