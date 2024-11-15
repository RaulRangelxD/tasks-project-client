'use client';

import { Tasks } from '@/components/tasks/Tasks';
import { getTasksByStatus } from '@/api/tasks';
import { useCallback, useEffect, useState } from 'react';
import { TaskInfo } from '@/lib/types';
import Loading from '@/app/Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [tasksPending, setTasksPending] = useState<TaskInfo[]>([]);
  const [tasksInProgress, setTasksInProgress] = useState<TaskInfo[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState<TaskInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const successToast = (msg: string) => {
    toast.success(msg, {
      position: 'top-center',
    });
  };

  const getDataPending = useCallback(async () => {
    try {
      const result = await getTasksByStatus('pending');
      setTasksPending(result);
    } catch (e) {
      console.log('error tasks', e);
    }
  }, [setTasksPending]);

  const getDataInProgress = useCallback(async () => {
    try {
      const result = await getTasksByStatus('in%20progress');
      setTasksInProgress(result);
    } catch (e) {
      console.log('error tasks', e);
    }
  }, [setTasksInProgress]);

  const getDataCompleted = useCallback(async () => {
    try {
      const result = await getTasksByStatus('completed');
      setTasksCompleted(result);
    } catch (e) {
      console.log('error tasks', e);
    }
  }, [setTasksCompleted]);

  const getAllData = useCallback(async () => {
    setLoading(true);

    await getDataPending();
    await getDataInProgress();
    await getDataCompleted();

    setLoading(false);
  }, [getDataPending, getDataInProgress, getDataCompleted]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <>
      <ToastContainer />
      {loading ? <Loading /> : <Tasks tasksPending={tasksPending} tasksInProgress={tasksInProgress} tasksCompleted={tasksCompleted} getAllData={getAllData} successToast={successToast} />}
    </>
  );
}
