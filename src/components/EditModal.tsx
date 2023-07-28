import {ITask} from '../models/ITask';
import {PropsWithChildren, useEffect, useState} from 'react';
import {Button, Modal, Text, TextInput, View} from 'react-native';
import {modalTaskSelector, showModalSelector} from '../redux/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {showModalAction} from '../redux/Modal/ModalAction';
import {confirmEditTaskAction} from '../redux/TaskList/TaskListAction';

type EditTaskProp = PropsWithChildren<{}>;

export default function EditModal(props: EditTaskProp): JSX.Element {
  const showModal = useSelector(showModalSelector);
  const modalTask = useSelector(modalTaskSelector);
  const [title, setTitle] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(modalTask.title);
  }, [showModal]);
  return (
    <Modal visible={showModal} transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
        }}>
        <View
          style={{
            width: '75%',
            borderWidth: 0.5,
            alignItems: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            padding: 8,
          }}>
          <TextInput
            style={{width: '100%', borderWidth: 0.5}}
            value={title}
            onChangeText={text => setTitle(text)}></TextInput>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
              paddingTop: 12,
              paddingBottom: 4,
            }}>
            <View style={{marginRight: 8}}>
              <Button
                title="cancel"
                onPress={() => dispatch(showModalAction())}
              />
            </View>
            <Button
              title="confirm"
              onPress={() => {
                dispatch(
                  confirmEditTaskAction({
                    ...modalTask,
                    title: title,
                  }),
                );
                dispatch(showModalAction());
              }}
              color={'green'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
