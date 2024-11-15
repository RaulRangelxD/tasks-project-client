'use client';

import { Tasks } from '@/components/tasks/Tasks';
import { getTasksByAuth } from '@/api/tasks';
import { useCallback, useEffect, useState } from 'react';
import { TaskInfo } from '@/lib/types';

export default function Home() {
  const [data, setData] = useState<TaskInfo[]>([]);

  const getDataTasks = useCallback(async () => {
    try {
      const result = await getTasksByAuth();
      setData(result);
    } catch (e) {
      console.log('error tasks', e);
    }
  }, [setData]);

  useEffect(() => {
    getDataTasks();
  }, [getDataTasks]);

  return <Tasks data={data} />;
}
