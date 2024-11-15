import { UserInfo } from '@/lib/types';
import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/users`;

export const getAllUsers = async (): Promise<UserInfo[]> => {
  try {
    const result = await axios.get(`${BASE_URL}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const getUser = async (): Promise<UserInfo> => {
  try {
    const result = await axios.get(`${BASE_URL}/email`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const getUserById = async (id: number): Promise<UserInfo> => {
  try {
    const result = await axios.get(`${BASE_URL}/id/${id}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const registerUser = async (username: string, email: string, password: string): Promise<void> => {
  try {
    await axios.post(BASE_URL, { username, email, password }, { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};
