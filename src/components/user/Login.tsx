'use client';

import { authCheck, login } from '@/api/auth';
import { useState } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [error, setError] = useState('');
  const { authTrue } = useAuth();

  const router = useRouter();

  const validateEmail = (email: string) => {
    const isValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    setErrorEmail(isValid ? '' : 'Invalid email format');
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) return;

    try {
      await login(email, password);
      authCheck();
      authTrue();
      setError('');
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (e) {
      console.log('Error authenticating user', e);
      setError('Error authenticating user');
    }
  };

  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <h1 className='mb-4 text-4xl font-bold'>Login</h1>
      <form className='max-w-sm flex flex-col space-y-4 w-full' onSubmit={handleLogin}>
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
        <input className='input-form' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        {error && <p className='text-red-500'>{error}</p>}

        <div className='flex flex-row space-x-2'>
          <button className='flex-1 btn-primary' type='submit'>
            Login
          </button>
          <Link className='btn-secondary' href='/register'>
            To register
          </Link>
          <Link className='btn-third' href='/'>
            Home
          </Link>
        </div>
      </form>
    </div>
  );
};
