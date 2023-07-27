import {ITask} from '../models/ITask';
import {PropsWithChildren, useEffect, useState} from 'react';
import {Button, Modal, Text, TextInput, View} from 'react-native';

type EditTaskProp = PropsWithChildren<{
  showModal: boolean;
  modalTask: ITask;
  index: number;
  onCancelModal(): void;
  onConfirmModal(task: ITask, index: number): void;
}>;

export default function EditModal(props: EditTaskProp): JSX.Element {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    setTitle(props.modalTask.title);
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
              <Button title="cancel" onPress={props.onCancelModal} />
            </View>
            <Button
              title="confirm"
              onPress={() => {
                props.onConfirmModal(
                  {
                    title: title,
                    isCompleted: props.modalTask.isCompleted,
                  },
                  props.index,
                );
              }}
              color={'green'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
