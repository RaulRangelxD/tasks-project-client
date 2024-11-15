import axios from 'axios';
import { DataToken } from '@/lib/types';

const BASE_URL = 'http://localhost:3001/auth';

export const login = async (email: string, password: string): Promise<void> => {
  try {
    await axios.post(`${BASE_URL}/login`, { email, password }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axios.post(
      `${BASE_URL}/logout`,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const authCheck = async (): Promise<DataToken | false> => {
  try {
    const response = await axios.get(`${BASE_URL}/authtoken`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true });
    return response.data.data;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'An unexpected error occurred');
    return false;
  }
};
