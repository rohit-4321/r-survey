import { useCallback, useState } from 'react';
import axiosInstance from '../../api/axios';
import { TestSchema } from '../../context/createTest/CreateTestContext';
import { AxiosResponse } from 'axios';

export const CreateQuizApi = (data: TestSchema) => {
  const token = localStorage.getItem('token');
  return axiosInstance.post<{id: string}>('/create', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const useCreateQuizApi  = () => {
  const [isLoading, setIsLoading] = useState(false);

  const trigger = useCallback((data : TestSchema) => new Promise<AxiosResponse<{id: string}>>((resolve, reject) => {
    setIsLoading(true);
    CreateQuizApi(data)
      .then(res => {
        setIsLoading(false);
        resolve(res);
      }).catch(err => {
        setIsLoading(false);
        reject(err);
      });
  }), []);
  return {
    trigger, isLoading
  };
};