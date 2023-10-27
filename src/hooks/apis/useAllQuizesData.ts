import { useEffect, useState } from 'react';
import { createSnackbar } from '../../components/ui/createSnackbar';
import { ServerErr, getRequest, useFetchRequest } from '../../api/axios';
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


  const  {requestTigger} = useFetchRequest();
  useEffect(() => {
    setLoading(true);
    requestTigger<Response>({
      method: 'GET',
      url: '/quizes'
    }).then((res) => {
      setData(res.data.data);
    }).catch((err: AxiosError<ServerErr>) => {
      if(err.response?.data.errCode) {
        createSnackbar({
          message:  err?.response?.data.errCode,
          duration: 'veryLong',
          varient: 'error'
        });
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return {loading, data};
};
