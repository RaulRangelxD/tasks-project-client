'use client'

import { MyGroups } from '@/components/groups/MyGroups'
import { getGroupsByAuth } from '@/api/group'
import { useCallback, useEffect, useState } from 'react'
import { GroupInfo } from '@/lib/types'
import Loading from '@/app/Loading'

export default function Home() {
  const [dataGroups, setDataGroup] = useState<GroupInfo[]>([])
  const [loading, setLoading] = useState(false)

  const getDataGroups = useCallback(async () => {
    try {
      const result = await getGroupsByAuth()
      setDataGroup(result)
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

  return <>{loading ? <Loading /> : <MyGroups dataGroups={dataGroups} getAllData={getAllData} />}</>
}
