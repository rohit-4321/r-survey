import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSnackbar } from '../../components/ui/createSnackbar';
import axiosInstance, { ServerErr, getRequest } from '../../api/axios';
import { AxiosError } from 'axios';
type UserFormItemSchema = {
  _id: string;
  title: string;
  description: string;
  numberOfResponses: number;
  lastResponse: string;
  createdAt: string;
  numberOfQuestions: number;
};

type Response = {
  data: UserFormItemSchema[]
}

export const useAllQuizesData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserFormItemSchema[]>([]);
  useEffect(() => {
    setLoading(true);
    getRequest<Response>({
      url: '/quizes'
    }).then(res => {
      setData(res.data.data);
      setLoading(false);
    }).catch((err: AxiosError<ServerErr>) => {
      setLoading(false);
      if(err.response?.data.errCode) {
        createSnackbar({
          message:  err?.response?.data.errCode,
          duration: 'veryLong',
          varient: 'error'
        });
      }
    });
  }, []);
  return {loading, data};

};
