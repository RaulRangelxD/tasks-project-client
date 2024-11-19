'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { SocketContext } from '@/components/context/SocketContext'
import { AuthContext } from '@/components/context/AuthContext'
import '@/app/globals.css'
import { authCheck } from '@/api/auth'
import { TaskInfo } from '@/lib/types'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Nabvar } from '@/components/Nabvar'
import Link from 'next/link'
import { Footer } from './Footer'
import Loading from '@/app/Loading'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [auth, setAuth] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  const notify = (data: TaskInfo[]) => {
    data.map((task) =>
      toast(
        <div>
          <div className='flex flex-row space-x-2'>
            <div className='flex-1'>
              <h2 className='text-sm font-light'>New Task</h2>
              <h2 className='text-xl font-bold text-black'>{task.title}</h2>
              <p>{task.description}</p>
              <p className={task.status === 'pending' ? `text-red-600` : 'text-white'}>{task.status}</p>
            </div>
            <div>
              <Link href={'/tasks/user'} className='btn-primary'>
                Ver
              </Link>
            </div>
          </div>
        </div>,
        {
          className: 'black-background',
          bodyClassName: 'grow-font-size',
          progressClassName: 'fancy-progress-bar',
        }
      )
    )
  }

  const authTrue = () => setAuth(true)
  const authFalse = () => setAuth(false)

  const authCheckStatus = useCallback(async () => {
    let tokenData = await authCheck()
    if (!auth) tokenData = await authCheck()
    if (!tokenData) {
      setAuth(false)
      if (socket) socket.disconnect()
      setSocket(null)
      setLoading(false)
      return
    }
    setAuth(true)
    if (!socket && tokenData) {
      const socketInstance = io(`${process.env.NEXT_PUBLIC_API}`, { auth: { userId: tokenData.id, email: tokenData.email } })
      setSocket(socketInstance)
      socketInstance.on('getNotifications', (data) => {
        notify(data)
      })
    }
    setLoading(false)
  }, [socket, auth])

  useEffect(() => {
    authCheckStatus()
  }, [authCheckStatus])

  return (
    <SocketContext.Provider value={socket}>
      <AuthContext.Provider value={{ auth, authTrue, authFalse }}>
        <ToastContainer autoClose={10000} />
        <div className='flex flex-col min-h-screen'>
          {loading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <Nabvar />
              <main className='flex flex-1 h-96'>{children}</main>
              <Footer />
            </>
          )}
        </div>
      </AuthContext.Provider>
    </SocketContext.Provider>
  )
}
