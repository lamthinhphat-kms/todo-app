import {PropsWithChildren, memo, useEffect, useState} from 'react';
import {Button, Modal, StyleSheet, TextInput, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {zustandStore} from 'zustand/store';

type EditModalZustandProps = PropsWithChildren<{}>;
export default memo(function EditModalZustand(props: EditModalZustandProps) {
  const setShowModal = zustandStore(store => store.setShowModal);
  const taskModal = zustandStore(store => store.taskModal);
  const [title, setTitle] = useState<string>(taskModal.title);

  const updateTask = zustandStore(store => store.updateTask);

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.background}>
      <View style={styles.modal}>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={text => setTitle(text)}></TextInput>
        <View style={styles.rowButton}>
          <View style={{marginRight: 8}}>
            <Button
              title="cancel"
              onPress={() => {
                setShowModal(false);
              }}
            />
          </View>
          <Button
            title="confirm"
            onPress={() => {
              updateTask({...taskModal, title: title});
              setShowModal(false);
            }}
            color={'green'}
          />
        </View>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '75%',
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 8,
  },
  textInput: {
    width: '100%',
    borderWidth: 0.5,
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingTop: 12,
    paddingBottom: 4,
  },
});
