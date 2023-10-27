import { useCallback, useState } from 'react';
import { useFetchRequest } from '../../api/axios';
import { JoinQuizSuccessResponse } from '../../components/join/join.interface';
import { AxiosResponse } from 'axios';

export const  getJoinQuizData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {requestTigger} = useFetchRequest();

  const trigger = useCallback((data : {quizId: string}) => new Promise<AxiosResponse<JoinQuizSuccessResponse>>((resolve, reject) => {
    setIsLoading(true);
    requestTigger<JoinQuizSuccessResponse>({
      method: 'POST',
      url: '/join',
      data
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }), []);

  return {
    isLoading, trigger
  };
  
};