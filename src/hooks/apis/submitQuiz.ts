import { useState, useCallback } from 'react';
import { postRequest } from '../../api/axios';
import { AxiosResponse } from 'axios';



interface Response {
  totalQuestions: number;
  correctAnswers: number
}
interface Payload {
  creatorEmail: string
	quizId: string
	answers: Record<string, string[]>
}
export const useSubmitQuiz = () => {
  const [isLoading, setLoading] = useState(false);

  const trigger =  useCallback((data: Payload) => new Promise<AxiosResponse<Response>>((resolve, reject) => {
    setLoading(true);
    postRequest<Response, Payload>({
      url: 'submitQuiz',
      data,
    }).then((res) => {
      resolve(res);
    }).catch(err => {
      reject(err);
    }).finally(() => {
      setLoading(false);
    });
  }), []);

  return {
    isLoading, trigger
  };

};