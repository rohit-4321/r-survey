import { useCallback, useState } from 'react';
import axiosInstance, { useFetchRequest } from '../../api/axios';
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
  const {requestTigger} = useFetchRequest();
  const trigger = useCallback((data : TestSchema) => new Promise<AxiosResponse<{id: string}>>((resolve, reject) => {
    setIsLoading(true);
    requestTigger({
      method: 'POST',
      url: '/create',
      data
    })
      .then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }), []);
  return {
    trigger, isLoading
  };
};