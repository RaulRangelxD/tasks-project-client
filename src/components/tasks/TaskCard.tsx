import { TaskCardProps, UserInfo } from '@/lib/types'
import { updateTaskStatus } from '@/api/tasks'
import { getTaskUsersById } from '@/api/taskUser'
import { useCallback, useEffect, useState } from 'react'
import { getUserById } from '@/api/users'

export const TaskCard: React.FC<TaskCardProps> = ({ userId, task, getAllData, successToast }) => {
  const [usersIds, setUsersIds] = useState<number[]>([])
  const [users, setUsers] = useState<UserInfo[]>([])

  const getUsers = useCallback(async (id: number) => {
    try {
      const result = await getTaskUsersById(id)
      const fetchUsers = await Promise.all(result.map((taskUser) => getUserById(taskUser.userId)))
      setUsers(fetchUsers)
      const UsersIdsFiltered = result.map((taskUser) => taskUser.userId)
      setUsersIds(UsersIdsFiltered)
    } catch (e) {
      console.log('error tasks', e)
    }
  }, [])

  useEffect(() => {
    getUsers(task.id)
  }, [getUsers, task.id])

  const handleForm = async (id: number, e: React.FormEvent, status: string) => {
    e.preventDefault()
    await updateTaskStatus(id, status)
    successToast('Task changed sucessfull')
    getAllData()
  }

  return (
    <div className='m-2 py-2 px-4 min-w-40 border rounded bg-neutral-300 space-y-2 w-full'>
      <div className='flex flex-row space-x-3'>
        <div className='flex-1 flex flex-col space-y-1'>
          <h2 className='text-xl font-semibold'>{task.title}</h2>
          <p className='text-sm font-light'>{task.description}</p>
        </div>
        <div className='flex flex-col-reverse items-end'>
          {users.map((user) => (
            <div className='flex flex-row button-third py-2' key={user.id}>
              <svg className='h-6 w-6 me-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <p>{user.username}</p>
            </div>
          ))}
          <div className='flex'></div>
        </div>
      </div>
      <div className='flex justify-center w-full'>
        <p className={`rounded-xl px-3 text-white font-bold ${task.status === 'pending' ? `bg-red-500` : task.status === 'in progress' ? `bg-yellow-500` : `bg-green-500`}`}>{task.status}</p>
      </div>
      <div className='flex flex-row space-x-2'>
        {usersIds.includes(userId) ? (
          task.status === 'pending' ? (
            <form
              onSubmit={(e) => {
                handleForm(task.id, e, 'in progress')
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
                  handleForm(task.id, e, 'pending')
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
                  handleForm(task.id, e, 'completed')
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
                handleForm(task.id, e, 'in progress')
              }}
            >
              <button type='submit' className='btn-third'>
                <svg className='h-8 w-8 text-blue-500' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                  {' '}
                  <path stroke='none' d='M0 0h24v24H0z' /> <line x1='5' y1='12' x2='19' y2='12' /> <line x1='5' y1='12' x2='11' y2='18' /> <line x1='5' y1='12' x2='11' y2='6' />
                </svg>
              </button>
            </form>
          )
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
