import {Button, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {InputField} from './components/InputField';
import {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthContext} from 'context/AuthContext';
import {useMutation} from '@tanstack/react-query';
import authService from 'api/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

import {BASE_URL} from '@env';

export function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {setAuthenticated} = useContext(AuthContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: data => {
      setAuthenticated(data.access_token, data.refresh_token);
      setEmail('');
      setPassword('');
    },
  });

  const sendGoogleToServerMutation = useMutation({
    mutationFn: authService.sendGoogleInfoToServer,
    onSuccess: data => {
      setAuthenticated(data.access_token, data.refresh_token);
      setEmail('');
      setPassword('');
    },
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.idToken);
      sendGoogleToServerMutation.mutate(userInfo.idToken ?? '');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <GoogleSigninButton
        style={{width: 222, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        disabled={
          loginMutation.isLoading || sendGoogleToServerMutation.isLoading
            ? true
            : false
        }
        onPress={signIn}
      />
      <InputField placeholder="Email" text={email} setText={setEmail} />
      <InputField
        placeholder="Password"
        text={password}
        setText={setPassword}
      />
      <Button
        title={
          loginMutation.isLoading || sendGoogleToServerMutation.isLoading
            ? 'Loading'
            : 'Sign in'
        }
        disabled={
          loginMutation.isLoading || sendGoogleToServerMutation.isLoading
            ? true
            : false
        }
        onPress={() => {
          loginMutation.mutate({
            email,
            password,
          });
        }}
      />
    </View>
  );
}
