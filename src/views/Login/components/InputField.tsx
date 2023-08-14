import {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

type InputProp = PropsWithChildren<{
  placeholder: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}>;

export function InputField(props: InputProp) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        placeholder={props.placeholder}
        value={props.text}
        onChangeText={newText => props.setText(newText)}
        style={styles.inputField}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
});