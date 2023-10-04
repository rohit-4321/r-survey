import { useCallback, useState } from 'react';
import { postRequest } from '../../api/axios';
import { JoinQuizSuccessResponse } from '../../components/join/join.interface';
import { AxiosResponse } from 'axios';

export const  getJoinQuizData = () => {
  const [isLoading, setIsLoading] = useState(false);

  const trigger = useCallback((data : {quizId: string}) => new Promise<AxiosResponse<JoinQuizSuccessResponse>>((resolve, reject) => {
    setIsLoading(true);
    postRequest<JoinQuizSuccessResponse, typeof data>({
      url: '/join',
      data: data
    })
      .then(res => {
        setIsLoading(false);
        resolve(res);
      }).catch(err => {
        setIsLoading(false);
        reject(err);
      });
  }), []);

  return {
    isLoading, trigger
  };
  
};