import axios, {AxiosError} from 'axios';
import {IUser} from 'models/IUser';

async function login({email, password}: {email: string; password: string}) {
  try {
    const response = await axios.post('/auth/signin', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function refreshTokenApi(refreshToken: string) {
  try {
    const response = await axios.post('/auth/refresh', {
      refresh_token: refreshToken,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function sendGoogleInfoToServer(userInfo: IUser) {
  try {
    console.log(userInfo);
    const response = await axios.post('/auth/google/login/mobile', {
      ...userInfo,
      password: '1',
    });
    return response.data;
  } catch (error) {
    const temp = error as AxiosError;
    console.log(temp.response?.data);
    throw error;
  }
}

const authService = {
  login,
  refreshTokenApi,
  sendGoogleInfoToServer,
};

export default authService;
