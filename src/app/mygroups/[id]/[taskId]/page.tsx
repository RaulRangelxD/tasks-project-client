'use client'

import { AddTaskUser } from '@/components/groups/AddTaskUser'
import { getGroupUsersByGroupId } from '@/api/groupUser'
import { useCallback, useEffect, useState } from 'react'
import { UserInfo } from '@/lib/types'
import Loading from '@/app/Loading'

import React from 'react'
import { getAllUsers } from '@/api/users'
import { getTaskUsersById } from '@/api/taskUser'

export default function Home({ params }: { params: Promise<{ id: number; taskId: number }> }) {
  const { id: groupId, taskId: taskId } = React.use(params)

  const [usersData, setUsersData] = useState<UserInfo[]>([])
  const [loading, setLoading] = useState(true)

  const getAllData = useCallback(async () => {
    setLoading(true)

    try {
      const fetchedUsers = await getAllUsers()
      const fetchedGroupUsers = await getGroupUsersByGroupId(groupId)
      const fetchedTaskUsers = await getTaskUsersById(taskId)

      const groupUsersId = fetchedGroupUsers.map((groupUser) => groupUser.userId)
      const taskUsersId = fetchedTaskUsers.map((taskUser) => taskUser.userId)

      const usersDataFilter = fetchedUsers.filter((user) => groupUsersId.includes(user.id))
      console.log('filter1', taskUsersId)

      const usersDataFilter2 = usersDataFilter.filter((user) => !taskUsersId.includes(user.id))
      console.log('filter2', usersDataFilter2)
      setUsersData(usersDataFilter2)
    } catch (e) {
      console.log('error tasks', e)
    } finally {
      setLoading(false)
    }
  }, [groupId, taskId])

  useEffect(() => {
    getAllData()
  }, [getAllData])

  return <>{loading ? <Loading /> : <AddTaskUser groupId={groupId} taskId={taskId} usersData={usersData} getAllData={getAllData} />}</>
}
