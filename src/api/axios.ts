import axios, { AxiosError, AxiosResponse } from 'axios';
import { createSnackbar } from '../components/ui/createSnackbar';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 3000,
});


interface GetRequestProps {
  url: string
}
interface PostRequestProps<Data> {
  url: string,
  data: Data
}
export interface ServerErr {
  message: string,
  errCode: string
}
export const getRequest  = <T>({url}:GetRequestProps)=> {
  const token = localStorage.getItem('token');
  if (!token || token == ''){
    window.location.href = '/auth';
  }
  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axiosInstance.get<T>(url,  {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      resolve(res);
    }).catch((err: AxiosError<ServerErr>) => {
      if(!err.response){
        createSnackbar({
          message:  'Unexpected Error!! Please try again after sometime.',
          duration: 'veryLong',
          varient: 'error'
        });
        reject();
      }
      if(err.response?.status === 401){
        window.location.href = '/auth';
        reject();
      }
      if(err.response?.data){
        reject(err);
      }
    });
  });
};

export const postRequest = <T, K>({url, data}:PostRequestProps<K>) => {
  const token = localStorage.getItem('token');
  if (!token || token == ''){
    window.location.href = '/auth';
  }
  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axiosInstance.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      resolve(res);
    }).catch((err: AxiosError<ServerErr>) => {
      if(!err.response){
        createSnackbar({
          message:  'Unexpected Error!! Please try again after sometime.',
          duration: 'veryLong',
          varient: 'error'
        });
        reject();
      }
      if(err.response?.status === 401){
        window.location.href = '/auth';
        reject();
      }
      if(err.response?.data){
        reject(err);
      }
    });
  });
};
export default axiosInstance;