import { GroupsProps } from '@/lib/types';
//import { TaskCard } from './TaskCard';
import Link from 'next/link';

export const Groups: React.FC<GroupsProps> = ({ dataGroups }) => {
  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <div className='max-w-xl w-full flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Groups</h1>
        <Link href='/groups/creategroup' className='btn-primary'>
          Create group
        </Link>

        {dataGroups.map((group) => (
          <div key={group.id} className='flex flex-row w-full my-2 border border-black rounded'>
            <Link className='grow p-2' href={`groups/${group.id}`}>
              <p className='px-2'>{group.title}</p>
            </Link>
            <button className='px-2'>Edit</button>
            <button className='px-2'>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
