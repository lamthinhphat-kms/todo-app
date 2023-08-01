import axios from 'axios';
import {BASE_URL} from '@env';
import {ITask} from '../models/ITask';
import {delay} from '@reduxjs/toolkit/dist/utils';

export async function getTasks(): Promise<ITask[]> {
  try {
    console.log('getTask');
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createTask({
  title,
  isCompleted,
}: {
  title: string;
  isCompleted: boolean;
}): Promise<ITask> {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, {
      title: title,
      isCompleted: isCompleted,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateTask({
  id,
  title,
  isCompleted,
}: {
  id: string;
  title: string;
  isCompleted: boolean;
}): Promise<ITask> {
  try {
    const response = await axios.put(`${BASE_URL}/tasks/${id}`, {
      id: id,
      title: title,
      isCompleted: isCompleted,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTask({id}: {id: string}): Promise<void> {
  try {
    await axios.delete(`${BASE_URL}/tasks/${id}`);
  } catch (error) {
    throw error;
  }
}
