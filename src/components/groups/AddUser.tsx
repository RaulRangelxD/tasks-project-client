import { useState } from 'react';
import { useSocket } from '@/components/context/SocketContext';
import { AddUserProps } from '@/lib/types';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link';

export const AddUser: React.FC<AddUserProps> = ({ groupId, usersData, getAllData }) => {
  const [userId, setUserId] = useState('');

  const socket = useSocket();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (socket) {
      try {
        socket.emit('addToGroup', { groupId, userId });

        setUserId('');

        toast.success('Users added sucessfull', {
          position: 'top-center',
        });
        getAllData();
      } catch (e) {
        toast.error('Error adding user', {
          position: 'top-center',
        });
        console.log('Error adding user: ', e);
      }
      return;
    }
    toast.error('Not logged', {
      position: 'top-center',
    });
  };
  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <ToastContainer />
      <h1 className='mb-4 text-4xl font-bold'>Create group</h1>
      <form className='max-w-sm flex flex-col space-y-4 w-full' onSubmit={handleFormSubmit}>
        <select onChange={(e) => setUserId(e.target.value)} value={userId} name='select' id='select'>
          <option value='' className='hidden'>
            Select a User
          </option>
          {usersData.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <div className='flex flex-row space-x-2'>
          <button type='submit' className='flex-1 btn-primary'>
            Create
          </button>
          <Link href={`/groups/${groupId}`} className='btn-secondary'>
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};
