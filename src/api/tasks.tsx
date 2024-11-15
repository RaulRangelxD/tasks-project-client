import { TaskInfo } from '@/lib/types';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/tasks';

export const getTasks = async (): Promise<TaskInfo[]> => {
  try {
    const result = await axios.get(`${BASE_URL}`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const getTasksByStatus = async (groupId: number, status: string): Promise<TaskInfo[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/status`, { headers: { 'Cache-Control': 'no-store' }, params: { groupId, status }, withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const getTasksByAuth = async (): Promise<TaskInfo[]> => {
  try {
    const result = await axios.get(`${BASE_URL}/auth`, { headers: { 'Cache-Control': 'no-store' }, withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const createTask = async (groupId: number, title: string, description: string) => {
  try {
    const result = await axios.post(`${BASE_URL}`, { groupId, title, description }, { withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const updateTaskStatus = async (id: number, status: string): Promise<TaskInfo[]> => {
  try {
    const result = await axios.patch(`${BASE_URL}/status/${id}`, { status }, { withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<TaskInfo[]> => {
  try {
    const result = await axios.delete(`${BASE_URL}/delete/${id}`, { withCredentials: true });
    return result.data.data;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    throw error;
  }
};
