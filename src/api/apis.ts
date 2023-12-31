import axiosInstance from './axios';

interface SignUpApiProps {
  email: string,
  password: string,
  userName: string,
}
interface SignUpResponse {
  jwtToken: string,
  id: string
}

export const SignUpUser = ({
  email,
  password,
  userName
}: SignUpApiProps) => {
  return axiosInstance.post<SignUpResponse>('/signup', {
    email,
    userName,
    password
  });
};

export const LoginUser = ({
  email,
  password
}: {
  email: string,
  password: string
}) => {
  return axiosInstance.post<{jwtToken: string}>('/login', {
    email,
    password
  });
};

