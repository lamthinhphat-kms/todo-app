import axios from 'axios';

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

const authService = {
  login,
  refreshTokenApi,
};

export default authService;
