import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {InputField} from 'components/InputField';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {RenderItemParams} from 'react-native-draggable-flatlist/lib/typescript/types';
import {ITask} from 'models/ITask';
import {v4 as uuid} from 'uuid';
import DraggableItem from './components/DraggableItem';

const DraggableToDoList = () => {
  const [text, setText] = useState<string>('');
  const [taskList, setTaskList] = useState<ITask[]>([]);
  return (
    <View style={styles.flex}>
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
      <View style={styles.inputContainer}>
        <View style={{flex: 1}}>
          <InputField
            placeholder="Write a task"
            text={text}
            setText={newText => setText(newText)}
          />
        </View>
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
          <Icon name="pluscircle" size={30} />
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
