import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [button, setButton] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!values.email || !values.password) {
      setError('All fields are required!');
      return;
    }
    setError('');
    setButton(true);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      setValues({ email: '', password: '' });

      setButton(false);
      navigate('/');
    } catch (error) {
      setButton(false);

      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        setError('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use. Please use a different email.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError('An error occurred. Please try again later.');
        console.error(error);
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-orange-600'>
      <div className='bg-white p-4 md:p-8 shadow-md rounded-lg w-[300px] sm:w-[450px]'>
        <h1 className='text-2xl font-semibold mb-4 text-left'>Login</h1>
        <form>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-left font-bold my-2 text-gray-600'
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setValues((prev) => ({ ...prev, email: e.target.value }));
              }}
              type='email'
              id='email'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400'
              placeholder='Enter your email'
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
              onChange={(e) => {
                setValues((prev) => ({ ...prev, password: e.target.value }));
              }}
              type='password'
              id='password'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400'
              placeholder='Enter your password'
            />
          </div>
          <p className='font-bold text-black'>{error}</p>

          <button
            onClick={handleLogin}
            disabled={button}
            type='button'
            className='w-full my-2 md:my-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none'
          >
            Login
          </button>
        </form>
        <div className='flex'>
          <p className='font-bold'>Don't have an account?</p>
          <Link
            className='mx-1 text-orange-400 hover:text-orange-500 hover:border-b-4 border-orange-600'
            to='/signup'
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
