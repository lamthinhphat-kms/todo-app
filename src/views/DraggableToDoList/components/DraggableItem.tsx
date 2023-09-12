import {View, Text, StyleSheet} from 'react-native';
import React, {PropsWithChildren, memo} from 'react';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {ITask} from 'models/ITask';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DraggableItem = ({
  item,
  drag,
  isActive,
}: RenderItemParams<ITask>): JSX.Element => {
  return (
    <ScaleDecorator>
      <TouchableOpacity onLongPress={drag} disabled={isActive}>
        <View style={[styles.flex, styles.container]}>
          <Text style={[styles.flex, styles.text]}>{item.title}</Text>
          <View style={{flexDirection: 'row'}}>
            {!item.isCompleted && (
              <TouchableOpacity onPress={() => {}}>
                <MaterialIcons
                  name="edit"
                  style={{backgroundColor: 'grey', ...styles.iconBtn}}
                  color={'white'}
                  size={20}
                />
              </TouchableOpacity>
            )}
            <View style={{width: 8}} />
            {!item.isCompleted && (
              <TouchableOpacity onPress={() => {}}>
                <MaterialIcons
                  name="done"
                  style={{
                    backgroundColor: 'green',
                    ...styles.iconBtn,
                  }}
                  color={'white'}
                  size={20}
                />
              </TouchableOpacity>
            )}
            <View style={{width: 8}} />
            <TouchableOpacity onPress={() => {}}>
              <MaterialIcons
                name="delete"
                style={{backgroundColor: 'red', ...styles.iconBtn}}
                color={'white'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </ScaleDecorator>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    borderWidth: 0.5,
    borderRadius: 15,
    margin: 4,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  iconBtn: {
    padding: 4,
    borderRadius: 4,
  },
});

export default DraggableItem;
