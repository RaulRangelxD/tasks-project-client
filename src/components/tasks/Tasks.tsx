import { TasksProps } from '@/lib/types'
import { TaskCard } from './TaskCard'

export const Tasks: React.FC<TasksProps> = ({ userId, groupId, tasksPending, tasksInProgress, tasksCompleted, groupUsers, getAllData, successToast }) => {
  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <div className='max-w-6xl w-full flex flex-col items-center justify-center'>
        <div className='flex flex-row w-full py-2'>
          <div className='flex flex-col w-full'>
            <h1 className='text-4xl font-bold pb-2'>Tasks</h1>
            <div className='flex flex-row space-x-2'>
              <span className='grow'></span>
              <div className='flex flex-row space-x-2 bg-neutral-500 bg-opacity-25 rounded p-1'>
                {groupUsers.map((user) => (
                  <div key={user.id} className='flex flex-row p-1 border rounded items-center bg-black text-white'>
                    <svg className='h-6 w-6 me-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <p className='font-semibold'>{user.username}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row items-start w-full'></div>
        <div className='grid grid-cols-3 w-full py-2'>
          <div className='w-full flex flex-col items-center'>
            <h2 className='text-2xl font-semibold'>Pending</h2>
            {tasksPending.map((task) => (
              <TaskCard key={task.id} userId={userId} groupId={groupId} task={task} getAllData={getAllData} successToast={successToast} />
            ))}
          </div>
          <div className='w-full flex flex-col items-center'>
            <h2 className='text-2xl font-semibold'>In progress</h2>
            {tasksInProgress.map((task) => (
              <TaskCard key={task.id} userId={userId} groupId={groupId} task={task} getAllData={getAllData} successToast={successToast} />
            ))}
          </div>
          <div className='w-full flex flex-col items-center'>
            <h2 className='text-2xl font-semibold'>Completed</h2>
            {tasksCompleted.map((task) => (
              <TaskCard key={task.id} userId={userId} groupId={groupId} task={task} getAllData={getAllData} successToast={successToast} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
