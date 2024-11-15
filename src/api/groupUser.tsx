import { GroupInfo, GroupUserInfo } from '@/lib/types';
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/groupusers`;

export const getGroupUsersById = async (groupId: number): Promise<GroupUserInfo[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/group/${groupId}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const updateGroup = async (id: number, title: string): Promise<GroupInfo[]> => {
  try {
    const result = await axios.patch(`${BASE_URL}/update/${id}`, { title }, { withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const deleteGroupUser = async (id: number): Promise<GroupInfo[]> => {
  try {
    const result = await axios.delete(`${BASE_URL}/delete/${id}`, { withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};
