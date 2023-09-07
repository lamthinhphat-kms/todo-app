import {GoogleSignin} from '@react-native-google-signin/google-signin';
import authService from 'api/auth';
import jwtDecode from 'jwt-decode';
import {FC, createContext, useEffect, useState} from 'react';
import {
  deleteKeyFromMMKVStorage,
  getStringFromsaveToMMKVStorage,
  saveToMMKVStorage,
} from 'utils/MMKVStorage';
import {removeAllNoti} from 'utils/NotificationAndroid';

interface AuthContextProps {
  userToken: string | undefined;
  isLoading: boolean;
  setAuthenticated: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextProps>({
  userToken: undefined,
  isLoading: true,
  setAuthenticated: () => {},
  logout: () => {},
});

export interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | undefined>(undefined);

  const setAuthenticated = async (
    accessToken: string,
    refreshToken: string,
  ) => {
    try {
      saveToMMKVStorage('access_token', accessToken);
      saveToMMKVStorage('refresh_token', refreshToken);
      setUserToken(accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    setUserToken(undefined);
    deleteKeyFromMMKVStorage('access_token');
    deleteKeyFromMMKVStorage('refresh_token');
    await GoogleSignin.signOut();
    removeAllNoti();
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      let tokenStorage = getStringFromsaveToMMKVStorage('access_token');
      if (tokenStorage) {
        const {exp} = jwtDecode<{
          exp: number;
        }>(tokenStorage);

        const expirationTime = exp * 1000;
        if (Date.now() <= expirationTime) {
          setUserToken(tokenStorage);
        } else {
          setUserToken(undefined);
          deleteKeyFromMMKVStorage('access_token');
          deleteKeyFromMMKVStorage('refresh_token');
          removeAllNoti();
          await GoogleSignin.signOut();
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setUserToken(undefined);
      deleteKeyFromMMKVStorage('access_token');
      deleteKeyFromMMKVStorage('refresh_token');
      removeAllNoti();
      await GoogleSignin.signOut();
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{userToken, isLoading, setAuthenticated, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
