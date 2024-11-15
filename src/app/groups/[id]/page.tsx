'use client';

import { Tasks } from '@/components/tasks/Tasks';
import { getTasksByStatus } from '@/api/tasks';
import { getGroupUsersById } from '@/api/groupUser';
import { getUserById } from '@/api/users';
import { useCallback, useEffect, useState } from 'react';
import { TaskInfo, UserInfo } from '@/lib/types';
import Loading from '@/app/Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

export default function Home({ params }: { params: Promise<{ id: number }> }) {
  const { id: groupId } = React.use(params);

  const [groupUsers, setGroupUsers] = useState<UserInfo[]>([]);
  const [tasksPending, setTasksPending] = useState<TaskInfo[]>([]);
  const [tasksInProgress, setTasksInProgress] = useState<TaskInfo[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState<TaskInfo[]>([]);

  const [loading, setLoading] = useState(true);

  const successToast = (msg: string) => {
    toast.success(msg, {
      position: 'top-center',
    });
  };

  const getAllGroupUsers = useCallback(async () => {
    try {
      const result = await getGroupUsersById(groupId);
      const getUsers = await Promise.all(result.map((groupUser) => getUserById(groupUser.userId)));
      setGroupUsers(getUsers);
    } catch (e) {
      console.log('error tasks', e);
    }
  }, [groupId]);

  const getDataPending = useCallback(async () => {
    try {
      const result = await getTasksByStatus(groupId, 'pending');
      setTasksPending(result);
    } catch (e) {
      console.log('error tasks', e);
    }
  }, [setTasksPending, groupId]);

  const getDataInProgress = useCallback(async () => {
    try {
      const result = await getTasksByStatus(groupId, 'in progress');
      setTasksInProgress(result);
    } catch (e) {
      console.log('error tasks', e);
    }
  }, [setTasksInProgress, groupId]);

  const getDataCompleted = useCallback(async () => {
    try {
      const result = await getTasksByStatus(groupId, 'completed');
      setTasksCompleted(result);
    } catch (e) {
      console.log('error tasks', e);
    }
  }, [setTasksCompleted, groupId]);

  const getAllData = useCallback(async () => {
    setLoading(true);

    await getAllGroupUsers();
    await getDataPending();
    await getDataInProgress();
    await getDataCompleted();

    setLoading(false);
  }, [getDataPending, getDataInProgress, getDataCompleted, getAllGroupUsers]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <Tasks
          groupId={groupId}
          tasksPending={tasksPending}
          tasksInProgress={tasksInProgress}
          tasksCompleted={tasksCompleted}
          groupUsers={groupUsers}
          getAllData={getAllData}
          successToast={successToast}
        />
      )}
    </>
  );
}
