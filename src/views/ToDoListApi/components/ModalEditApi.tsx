import {PropsWithChildren, useEffect, useState} from 'react';
import {ITask} from '../../../models/ITask';
import {
  ActivityIndicator,
  Button,
  Keyboard,
  Modal,
  TextInput,
  View,
} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateTask} from '../../../api/tasks';

type ModalEditProps = PropsWithChildren<{
  task: ITask;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}>;
export default function ModalEditApi(props: ModalEditProps): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const queryClient = useQueryClient();
  const updateTaskMuatation = useMutation({
    mutationFn: updateTask,
    onSuccess: data => {
      setTitle(''), Keyboard.dismiss();
      props.setShowModal(prevShowModal => !prevShowModal);
      queryClient.invalidateQueries(['tasks'], {exact: true});
    },
  });

  useEffect(() => {
    setTitle(props.task.title);
  }, [props.showModal]);
  return (
    <Modal visible={props.showModal} transparent={true}>
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
                onPress={() => {
                  props.setShowModal(prevShowModal => !prevShowModal);
                }}
              />
            </View>
            <View>
              <Button
                title="confirm"
                disabled={updateTaskMuatation.isLoading}
                onPress={() => {
                  updateTaskMuatation.mutateAsync({
                    id: props.task.id,
                    title: title,
                    isCompleted: props.task.isCompleted,
                  });
                }}
                color={'green'}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
