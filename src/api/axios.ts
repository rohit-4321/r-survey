/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { createSnackbar } from '../components/ui/createSnackbar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';


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

// TODO

// 1. common custom hook that bind token and and time out logic.

type RequestConfig<D = any> = Omit<AxiosRequestConfig<D>, 'headers'>

const postAxios = <T = any, R = AxiosResponse<T>, D = any>(
  url: string, data?: D, config?: RequestConfig<D>
): Promise<R> => {

  const token = localStorage.getItem('token');
  if (!token || token == ''){
    window.location.href = '/auth';
  }
  return new Promise<R>((resolve, reject) => {
    axiosInstance.post<T, R>(url, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      resolve(res);
    }).catch((err: AxiosError<ServerErr>) => {
      if(!err.response && !(err.code === 'ERR_CANCELED')){
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

const getAxios  = <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: RequestConfig<D>): Promise<R> => {
  const token = localStorage.getItem('token');
  if (!token || token == ''){
    window.location.href = '/auth';
  }
  return new Promise<R>((resolve, reject) => {
    axiosInstance.get<T, R, D>(url, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      resolve(res);
    }).catch((err: AxiosError<ServerErr>) => {
      console.log(err);
      if(!err.response && !(err.code === 'ERR_CANCELED')){
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


// 2. api wrapper state or cache data and re fetch logic. or handle abort login

type RequestTriggerProps<D> = {
  method: 'POST',
  url: string, data?: D, config?: RequestConfig<D>
} | 
{
  method: 'GET'
  url: string, config?: AxiosRequestConfig<D>
}

export const useFetchRequest = () => {   

  const requestController = useRef<AbortController[]>([]); 

  const requestTigger = useCallback(<T = any, R = AxiosResponse<T>, D = any>(
    params: RequestTriggerProps<D>
  ): Promise<R> => {

    const controller = new AbortController();
    requestController.current.push(controller);

    if(params.method === 'POST'){
      return postAxios(params.url, params.data, {
        ...params.config,
        signal: controller.signal
      });
    }
    return getAxios(params.url, {
      ...params.config,
      signal: controller.signal
    });
  }, []);
  useEffect(() => () =>  {requestController.current.forEach((c) => c.abort());}, []);
  return {requestTigger};
};

// 3. compenent individual custom hooks for api call with there transform method. 

