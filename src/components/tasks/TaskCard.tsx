import { TaskCardProps, UserInfo, UserTaskInfo } from '@/lib/types';
import { deleteTask, updateTaskStatus } from '@/api/tasks';
import { deleteTaskUser, getTaskUsersById } from '@/api/taskUser';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserById } from '@/api/users';

export const TaskCard: React.FC<TaskCardProps> = ({ groupId, task, getAllData, successToast }) => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [taskUsers, setTaskUsers] = useState<UserTaskInfo[]>([]);

  const getUsers = useCallback(async (id: number) => {
    try {
      const result = await getTaskUsersById(id);
      setTaskUsers(result);
      const fetchUsers = await Promise.all(result.map((taskUser) => getUserById(taskUser.userId)));
      setUsers(fetchUsers);
    } catch (e) {
      console.log('error tasks', e);
    }
  }, []);

  useEffect(() => {
    getUsers(task.id);
  }, [getUsers, task.id]);

  const handleForm = async (id: number, e: React.FormEvent, status: string) => {
    e.preventDefault();
    await updateTaskStatus(id, status);
    successToast('Task changed sucessfull');
    getAllData();
  };
  const handleDelete = async (id: number, e: React.FormEvent) => {
    e.preventDefault();
    await deleteTask(id);
    successToast('Task deleted');
    getAllData();
  };

  const handleDeleteUser = async (id: number, e: React.FormEvent) => {
    e.preventDefault();
    await deleteTaskUser(id);
    successToast('User deleted');
    getAllData();
  };

  return (
    <div className='m-2 py-2 px-4 min-w-40 border rounded bg-neutral-300 space-y-2 w-full'>
      <div className='flex flex-row space-x-3'>
        <div className='flex-1 flex flex-col space-y-1'>
          <h2 className='text-xl font-semibold'>{task.title}</h2>
          <p className='text-sm font-light'>{task.description}</p>
          <div className='flex'>
            <p className={`rounded-xl px-3 text-white font-bold ${task.status === 'pending' ? `bg-red-500` : task.status === 'in progress' ? `bg-yellow-500` : `bg-green-500`}`}>{task.status}</p>
          </div>
        </div>
        <div className='flex flex-col space-y-2 items-end'>
          {users.map((user, index) => (
            <div className='flex flex-row border rounded bg-black text-white p-1' key={user.id}>
              <svg className='h-6 w-6 me-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <p>{user.username}</p>
              <form
                onSubmit={(e) => {
                  handleDeleteUser(taskUsers[index].id, e);
                }}
              >
                <button type='submit'>
                  {' '}
                  <svg className='h-5 w-5 ms-1' viewBox='0 -5 24 28' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    {' '}
                    <polyline points='3 6 5 6 21 6' /> <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
                  </svg>
                </button>
              </form>
            </div>
          ))}
          <div>
            <Link className='p-1 bg-black text-white rounded' href={`/groups/${groupId}/${task.id}`}>
              Add User
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-row space-x-2'>
        {task.status === 'pending' ? (
          <form
            onSubmit={(e) => {
              handleForm(task.id, e, 'in progress');
            }}
          >
            <button type='submit' className='btn-third'>
              <svg className='h-8 w-8 text-green-500' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                {' '}
                <path stroke='none' d='M0 0h24v24H0z' /> <path d='M5 12l5 5l10 -10' />
              </svg>
            </button>
          </form>
        ) : task.status === 'in progress' ? (
          <>
            <form
              onSubmit={(e) => {
                handleForm(task.id, e, 'pending');
              }}
            >
              <button type='submit' className='btn-third'>
                <svg className='h-8 w-8 text-blue-500' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' /> <line x1='5' y1='12' x2='19' y2='12' /> <line x1='5' y1='12' x2='11' y2='18' /> <line x1='5' y1='12' x2='11' y2='6' />
                </svg>
              </button>
            </form>
            <form
              onSubmit={(e) => {
                handleForm(task.id, e, 'completed');
              }}
            >
              <button type='submit' className='btn-third'>
                <svg className='h-8 w-8 text-green-500' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' /> <path d='M5 12l5 5l10 -10' />
                </svg>
              </button>
            </form>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              handleForm(task.id, e, 'in progress');
            }}
          >
            <button type='submit' className='btn-third'>
              <svg className='h-8 w-8 text-blue-500' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                {' '}
                <path stroke='none' d='M0 0h24v24H0z' /> <line x1='5' y1='12' x2='19' y2='12' /> <line x1='5' y1='12' x2='11' y2='18' /> <line x1='5' y1='12' x2='11' y2='6' />
              </svg>
            </button>
          </form>
        )}
        <form
          onSubmit={(e) => {
            handleDelete(task.id, e);
          }}
        >
          <button type='submit' className='btn-third'>
            <svg className='h-8 w-8 text-red-500' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
              {' '}
              <path stroke='none' d='M0 0h24v24H0z' /> <line x1='18' y1='6' x2='6' y2='18' /> <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
