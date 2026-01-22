import apiClient from './client';
import { AuthResponse } from '../types';
import { setAccessToken, setRefreshToken, clearTokens } from '../utils/token';

export const register = async (data: {
  email: string;
  password: string;
  name: string;
}): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  const { accessToken, refreshToken } = response.data;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  return response.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);
  const { accessToken, refreshToken } = response.data;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  return response.data;
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    clearTokens();
  }
};