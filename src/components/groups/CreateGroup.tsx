import { useState } from 'react';
import { createGroup } from '@/api/group';
import { useAuth } from '../context/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link';

export const CreateGroup = () => {
  const [title, setTitle] = useState('');
  const auth = useAuth();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth) {
      try {
        await createGroup(title);

        setTitle('');

        toast.success('Task created', {
          position: 'top-center',
        });
      } catch (e) {
        toast.error('Error creating task', {
          position: 'top-center',
        });
        console.log('Error creating task: ', e);
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
        <input type='text' className='input-form' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className='flex flex-row space-x-2'>
          <button type='submit' className='flex-1 btn-primary'>
            Create
          </button>
          <Link href={'/groups'} className='btn-secondary'>
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};
