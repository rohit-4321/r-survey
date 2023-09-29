import { TestSchema } from './../context/createTest/CreateTestContext';
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
// interface ServerErr {
//   message: string,
//   errCode: string
// }
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

