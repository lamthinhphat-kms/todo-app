import {PropsWithChildren, memo, useEffect, useState} from 'react';
import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import modalSlice from 'redux/Modal/modalSlice';
import taskListSlice from 'redux/TaskList/taskListSlice';
import {showModalSelector, modalTaskSelector} from 'redux/selectors';

type EditTaskProp = PropsWithChildren<{}>;

export default memo(function EditModalStore(props: EditTaskProp): JSX.Element {
  const showModal = useSelector(showModalSelector);
  const modalTask = useSelector(modalTaskSelector);
  const [title, setTitle] = useState<string>('');
  const dispatch = useDispatch();
  useEffect(() => {
    setTitle(modalTask.title);
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
                onPress={() => dispatch(modalSlice.actions.showModal({}))}
              />
            </View>
            <Button
              title="confirm"
              onPress={() => {
                dispatch(
                  taskListSlice.actions.confirmEditTask({
                    modalTask: {
                      ...modalTask,
                      title: title,
                    },
                  }),
                );
                dispatch(modalSlice.actions.showModal({}));
              }}
              color={'green'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
});

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
