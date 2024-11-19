'use client'

import { AddUser } from '@/components/groups/AddUser'
import { getGroupUsersByGroupId } from '@/api/groupUser'
import { useCallback, useEffect, useState } from 'react'
import { UserInfo } from '@/lib/types'
import Loading from '@/app/Loading'

import React from 'react'
import { getAllUsers } from '@/api/users'

export default function Home({ params }: { params: Promise<{ id: number }> }) {
  const { id: groupId } = React.use(params)

  const [usersData, setUsersData] = useState<UserInfo[]>([])
  const [loading, setLoading] = useState(true)

  const getAllData = useCallback(async () => {
    setLoading(true)

    try {
      const fetchedUsers = await getAllUsers()
      const fetchedGroupUsers = await getGroupUsersByGroupId(groupId)

      const groupUsersId = fetchedGroupUsers.map((groupUser) => groupUser.userId)
      const usersDataFilter = fetchedUsers.filter((user) => !groupUsersId.includes(user.id))
      setUsersData(usersDataFilter)
    } catch (e) {
      console.log('error tasks', e)
    } finally {
      setLoading(false)
    }
  }, [groupId])

  useEffect(() => {
    getAllData()
  }, [getAllData])

  return <>{loading ? <Loading /> : <AddUser groupId={groupId} usersData={usersData} getAllData={getAllData} />}</>
}
