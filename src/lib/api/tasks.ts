import apiClient from './client';
import { Task, TasksResponse, CreateTaskInput, UpdateTaskInput } from '../types';

export const getTasks = async (params: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<TasksResponse> => {
  const response = await apiClient.get<TasksResponse>('/tasks', { params });
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await apiClient.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (data: CreateTaskInput): Promise<Task> => {
  const response = await apiClient.post<Task>('/tasks', data);
  return response.data;
};

export const updateTask = async (id: string, data: UpdateTaskInput): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await apiClient.delete(`/tasks/${id}`);
};

export const toggleTaskStatus = async (id: string): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${id}/toggle`);
  return response.data;
};