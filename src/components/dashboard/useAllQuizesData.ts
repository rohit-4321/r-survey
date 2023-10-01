import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSnackbar } from '../../global';
import axiosInstance from '../../api/axios';
type UserFormItemSchema = {
  _id: string;
  title: string;
  description: string;
  numberOfResponses: number;
  lastResponse: string;
  createdAt: string;
  numberOfQuestions: number;
};

export const useAllQuizesData = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserFormItemSchema[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token == ''){
      navigate('/auth');
    }else {
      setLoading(true);
      axiosInstance.get('/quizes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setLoading(false);
        setData(res.data.data);
      }).catch((err) => {
        setLoading(false);
        createSnackbar({
          message:  err?.response?.data.errCode,
          duration: 'veryLong',
          varient: 'error'
        });
      });
    }

  }, []);
  return {loading, data};

};
