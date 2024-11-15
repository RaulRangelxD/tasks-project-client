'use client';

import { registerUser } from '@/api/users';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [errorUsername, setErrorUsername] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorpassword] = useState('');
  const [errorPassword2, setErrorpassword2] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const validateUsername = (username: string) => {
    const isValid = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);
    setErrorUsername(isValid ? '' : 'Invalid username format');
    return isValid;
  };

  const validateEmail = (email: string) => {
    const isValid = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email);
    setErrorEmail(isValid ? '' : 'Invalid email format');
    if (!isValid) {
      console.log('ERROOOOOR');
    }
    return isValid;
  };

  const validatePassword = (password: string) => {
    const isValid = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/gm.test(password);
    setErrorpassword(isValid ? '' : 'Invalid password format');
    return isValid;
  };

  const validatePassword2 = (password2: string) => {
    const isValid = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/gm.test(password);
    setErrorpassword2(isValid ? '' : 'Invalid password format');
    if (password !== password2) {
      setErrorpassword2('Password dont equal');
    }
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUsername(username)) return;
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;
    if (!validatePassword2(password2)) return;

    try {
      await registerUser(username, email, password);
      setError('');

      setUsername('');
      setEmail('');
      setPassword('');
      setPassword2('');
      router.push('/login');
    } catch (e) {
      console.log('Error authenticating user', e);
      setError('Error authenticating user');
    }
  };

  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <h1 className='mb-4 text-4xl font-bold'>Register</h1>
      <form className='max-w-sm flex flex-col space-y-4 w-full' onSubmit={handleLogin}>
        <input
          className='input-form'
          type='text'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          onBlur={(e) => {
            validateUsername(e.target.value);
          }}
        />
        {errorUsername && <p className='text-red-500 mt-2'>{errorUsername}</p>}

        <input
          className='input-form'
          type='text'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => {
            validateEmail(e.target.value);
          }}
        />
        {errorEmail && <p className='text-red-500 mt-2'>{errorEmail}</p>}

        <input
          className='input-form'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => {
            validatePassword(e.target.value);
          }}
        />
        {errorPassword && <p className='text-red-500'>{errorPassword}</p>}

        <input
          className='input-form'
          type='password'
          placeholder='Repeat password'
          onChange={(e) => setPassword2(e.target.value)}
          onBlur={(e) => {
            validatePassword2(e.target.value);
          }}
        />
        {errorPassword2 && <p className='text-red-500'>{errorPassword2}</p>}

        {error && <p className='text-red-500'>{error}</p>}

        <div className='flex flex-row space-x-2'>
          <button className='flex-1 btn-primary' type='submit'>
            Register
          </button>
          <Link className='btn-secondary' href='/login'>
            To login
          </Link>
          <Link className='btn-third' href='/'>
            Home
          </Link>
        </div>
      </form>
    </div>
  );
};
