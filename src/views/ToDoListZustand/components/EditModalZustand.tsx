import {PropsWithChildren, useEffect, useState} from 'react';
import {Button, Modal, StyleSheet, TextInput, View} from 'react-native';
import {zustandStore} from 'zustand/store';

type EditModalZustandProps = PropsWithChildren<{}>;
export function EditModalZustand(props: EditModalZustandProps) {
  const showModal = zustandStore(store => store.showModal);
  const setShowModal = zustandStore(store => store.setShowModal);
  const taskModal = zustandStore(store => store.taskModal);
  const [title, setTitle] = useState<string>('');

  const updateTask = zustandStore(store => store.updateTask);
  useEffect(() => {
    setTitle(taskModal.title);
  }, [showModal]);

  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.background}>
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
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
