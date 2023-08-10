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
      setEmail(''), setPassword('');
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <InputField placeholder="Email" text={email} setText={setEmail} />
      <InputField
        placeholder="Password"
        text={password}
        setText={setPassword}
      />
      <Button
        title={loginMutation.isLoading ? 'Loading' : 'Sign in'}
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
