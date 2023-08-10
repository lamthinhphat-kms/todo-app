import {AuthContext} from 'context/AuthContext';
import {useContext} from 'react';
import {Button, View} from 'react-native';

function AccountScreen() {
  const {logout} = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

export default AccountScreen;
