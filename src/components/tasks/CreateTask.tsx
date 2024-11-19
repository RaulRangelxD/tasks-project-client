import { DataCreateTask } from '@/lib/types'
import { useSocket } from '@/components/context/SocketContext'
import { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Link from 'next/link'
import { createTask } from '@/api/tasks'

export const CreateTask: React.FC<DataCreateTask> = ({ groupId }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const socket = useSocket()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (socket) {
      try {
        createTask(groupId, title, description)

        setTitle('')
        setDescription('')

        toast.success('Task created', {
          position: 'top-center',
        })
      } catch (e) {
        toast.error('Error creating task', {
          position: 'top-center',
        })
        console.log('Error creating task: ', e)
      }
      return
    }
    toast.error('Not logged', {
      position: 'top-center',
    })
  }
  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <ToastContainer />
      <h1 className='mb-4 text-4xl font-bold'>Create task</h1>
      <form className='max-w-sm flex flex-col space-y-4 w-full' onSubmit={handleFormSubmit}>
        <input type='text' className='input-form' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type='text' className='input-form' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className='flex flex-row space-x-2'>
          <button type='submit' className='flex-1 btn-primary'>
            Create
          </button>
          <Link href={`/mygroups/${groupId}`} className='btn-secondary'>
            Back
          </Link>
        </div>
      </form>
    </div>
  )
}
