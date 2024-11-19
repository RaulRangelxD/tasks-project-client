import { deleteGroup } from '@/api/group'
import { GroupsProps } from '@/lib/types'
//import { TaskCard } from './TaskCard';
import Link from 'next/link'

export const MyGroups: React.FC<GroupsProps> = ({ dataGroups, getAllData }) => {
  const handleDelete = async (id: number, e: React.FormEvent) => {
    console.log(id)
    e.preventDefault()
    await deleteGroup(id)
    // successToast('User deleted');
    getAllData()
  }
  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <div className='max-w-xl w-full flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Groups</h1>
        <Link href='/mygroups/creategroup' className='btn-primary'>
          Create group
        </Link>

        {dataGroups.map((group) => (
          <div key={group.id} className='flex flex-row w-full my-2 border border-black rounded'>
            <Link className='grow p-2' href={`mygroups/${group.id}`}>
              <p className='px-2'>{group.title}</p>
            </Link>
            <div className='flex flex-row space-x-2 px-2'>
              <button className=''>Edit</button>
              <form
                className='flex'
                onSubmit={(e) => {
                  console.log(group.id)
                  handleDelete(group.id, e)
                }}
              >
                <button type='submit'>
                  <svg className='h-6 w-6 ms-1' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    {' '}
                    <polyline points='3 6 5 6 21 6' /> <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
