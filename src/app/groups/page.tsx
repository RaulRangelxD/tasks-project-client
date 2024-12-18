'use client'

import { Groups } from '@/components/groups/Groups'
import { getGroupUsersByAuth } from '@/api/groupUser'
import { getGroupsById } from '@/api/group'
import { useCallback, useEffect, useState } from 'react'
import { GroupInfo } from '@/lib/types'
import Loading from '@/app/Loading'

export default function Home() {
  const [dataGroups, setDataGroup] = useState<GroupInfo[]>([])
  const [loading, setLoading] = useState(false)

  const getDataGroups = useCallback(async () => {
    try {
      const result = await getGroupUsersByAuth()
      const groupsIds = result.map((group) => group.groupId)

      const getGroups = await Promise.all(groupsIds.map((groupId) => getGroupsById(groupId)))
      setDataGroup(getGroups)
    } catch (e) {
      console.log('error tasks', e)
    }
  }, [setDataGroup])

  const getAllData = useCallback(async () => {
    setLoading(true)

    await getDataGroups()

    setLoading(false)
  }, [getDataGroups])

  useEffect(() => {
    getAllData()
  }, [getAllData])

  return <>{loading ? <Loading /> : <Groups dataGroups={dataGroups} getAllData={getAllData} />}</>
}
