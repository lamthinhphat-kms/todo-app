import {AuthContext} from 'context/AuthContext';
import {ThemeContext} from 'context/ThemeContext';
import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Switch, Text, View} from 'react-native';

function AccountScreen() {
  const {logout} = useContext(AuthContext);
  const {isDarkMode, toggleDarkMode} = useContext(ThemeContext);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDarkMode ? 'gainsboro' : 'white',
      }}>
      <View
        style={{
          ...styles.section,
          backgroundColor: isDarkMode ? 'gainsboro' : 'white',
        }}>
        <Text
          style={{
            color: 'black',
          }}>
          Dark mode
        </Text>
        <Switch value={isDarkMode} onChange={toggleDarkMode}></Switch>
      </View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  section: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    padding: 8,
    marginBottom: 16,
    elevation: 5,
  },
});
export default AccountScreen;
