'use client';

import { getUser } from '@/api/users';
import { authCheck, logout } from '@/api/auth';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserInfo } from '@/lib/types';
import { useAuth } from '@/components/context/AuthContext';

export const User = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const { auth, authFalse } = useAuth();
  const router = useRouter();

  const authStatus = useCallback(async () => {
    if (!auth) {
      setTimeout(() => router.push('/'), 3000);
      return false;
    }
    return true;
  }, [router, auth]);

  const getUserInfo = useCallback(async () => {
    try {
      const userInfo = await getUser();
      setUser(userInfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, []);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await logout();
      authCheck();
      authFalse();
      router.push('/');
    } catch (e) {
      console.log('Error authenticating user', e);
    }
  };

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const isAuthenticated = await authStatus();
      if (isAuthenticated) {
        await getUserInfo();
      }
    };
    checkAuthAndFetchUser();
  }, [getUserInfo, authStatus]);

  if (!auth)
    return (
      <div className='flex-1 flex flex-col items-center justify-center'>
        <p>dont logged, returning to home...</p>
      </div>
    );

  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <h1 className='mb-4 text-4xl font-bold'>User</h1>
      {!user ? (
        'Loading...'
      ) : (
        <>
          <p>{user.id}</p> <p>{user.username}</p> <p>{user.email}</p>
        </>
      )}
      <div className='flex flex-row space-x-2'>
        <Link className='btn-primary' href='/'>
          Edit user
        </Link>
        <form
          onSubmit={(e) => {
            handleLogout(e);
          }}
        >
          <button className='btn-secondary' onClick={() => logout()}>
            Log out
          </button>
        </form>
        <Link className='btn-third' href='/'>
          Home
        </Link>
      </div>
    </div>
  );
};
