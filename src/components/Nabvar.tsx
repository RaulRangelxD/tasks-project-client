import { useAuth } from './context/AuthContext'
import Link from 'next/link'

export const Nabvar = () => {
  const { auth } = useAuth()

  return (
    <>
      <nav className='flex flex-row space-x-3 px-3 py-2 w-full bg-neutral-500 bg-opacity-25'>
        <Link className='btn-third ' href='/'>
          Home
        </Link>

        {auth ? (
          <>
            <Link className='btn-third' href='/mygroups'>
              My Groups
            </Link>
            <Link className='btn-third' href='/groups'>
              Groups
            </Link>
            <Link className='btn-third' href='/user'>
              User
            </Link>
          </>
        ) : (
          <>
            <Link className='btn-third' href='/login'>
              Login
            </Link>
            <Link className='btn-third' href='/register'>
              Register
            </Link>
          </>
        )}
      </nav>
    </>
  )
}
