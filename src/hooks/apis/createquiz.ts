import axiosInstance from '../../api/axios';
import { TestSchema } from '../../context/createTest/CreateTestContext';

export const CreateQuizApi = (data: TestSchema) => {
  const token = localStorage.getItem('token');
  return axiosInstance.post<{id: string}>('/create', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};