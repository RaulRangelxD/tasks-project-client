import { GroupInfo } from '@/lib/types';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/groups';

export const getGroupsByAuth = async (): Promise<GroupInfo[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/auth`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const createGroup = async (title: string) => {
  try {
    const result = await axios.post(`${BASE_URL}`, { title }, { withCredentials: true });
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

export const deleteGroup = async (id: number): Promise<GroupInfo[]> => {
  try {
    const result = await axios.delete(`${BASE_URL}/delete/${id}`, { withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};
