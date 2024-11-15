'use client';

import { Groups } from '@/components/groups/Groups';
import { getGroupsByAuth } from '@/api/group';
import { useCallback, useEffect, useState } from 'react';
import { GroupInfo } from '@/lib/types';
import Loading from '@/app/Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [dataGroups, setDataGroup] = useState<GroupInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const successToast = (msg: string) => {
    toast.success(msg, {
      position: 'top-center',
    });
  };

  const getDataGroups = useCallback(async () => {
    try {
      const result = await getGroupsByAuth();
      setDataGroup(result);
    } catch (e) {
      console.log('error tasks', e);
    }
  }, [setDataGroup]);

  const getAllData = useCallback(async () => {
    setLoading(true);

    await getDataGroups();

    setLoading(false);
  }, [getDataGroups]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <>
      <ToastContainer />
      {loading ? <Loading /> : <Groups dataGroups={dataGroups} />}
    </>
  );
}
