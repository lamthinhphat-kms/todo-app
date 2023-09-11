import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {InputField} from 'components/InputField';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {ITask} from 'models/ITask';
import {v4 as uuid} from 'uuid';
import DraggableItem from './components/DraggableItem';
import Voice from '@react-native-voice/voice';
import {ThemeContext} from 'context/ThemeContext';

const DraggableToDoList = () => {
  const [text, setText] = useState<string>('');
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const {isDarkMode} = useContext(ThemeContext);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => {
      setIsRecording(false);
    };
    Voice.onSpeechError = error => {
      console.log(error);
      setIsRecording(false);
    };
    Voice.onSpeechResults = result => {
      setIsRecording(false);

      setText(result.value ? result.value[0] : '');
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onStartRecording = async () => {
    try {
      console.log('start');
      await Voice.start('en-US');
    } catch (error) {
      console.log(error);
    }
  };

  const onStopRecoding = async () => {
    try {
      console.log('stop');
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        ...styles.flex,
        backgroundColor: isDarkMode ? 'gainsboro' : 'white',
      }}>
      <View style={styles.flex}>
        <NestableScrollContainer>
          <NestableDraggableFlatList
            data={taskList}
            keyExtractor={(item, index) => item.id}
            onDragEnd={({data}) => setTaskList(data)}
            renderItem={DraggableItem}
          />
        </NestableScrollContainer>
      </View>
      <View
        style={{
          ...styles.inputContainer,
        }}>
        <View style={{flex: 1}}>
          <InputField
            placeholder="Write a task"
            text={text}
            setText={newText => setText(newText)}
          />
        </View>
        <TouchableOpacity
          style={{marginRight: 8}}
          onPress={isRecording ? onStopRecoding : onStartRecording}>
          <Icon
            name="notification"
            size={30}
            color={isRecording ? 'red' : undefined}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTaskList([
              ...taskList,
              {
                id: uuid(),
                title: text,
                isCompleted: false,
              },
            ]);
            setText('');
          }}>
          <Icon
            name="pluscircle"
            size={30}
            color={isDarkMode ? 'gray' : undefined}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

export default DraggableToDoList;
