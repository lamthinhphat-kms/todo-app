import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import TaskTileApi from './components/TaskTileApi';
import useToDoApiHook from 'hooks/useToDoApiHook';
import ModalEditApi from './components/ModalEditApi';
import {
  useReactNavigationQuery,
  useRefetchOnFocus,
} from 'hooks/useRefetchOnFocus';
import Animated, {
  Layout,
  SlideInRight,
  useSharedValue,
} from 'react-native-reanimated';
import taskService from 'api/tasks';
import {InputField} from 'components/InputField';
import {useContext, useEffect} from 'react';
import {AuthContext} from 'context/AuthContext';
import jwtDecode from 'jwt-decode';
import {socket} from 'socket/socket';
import {
  handleListScheduleNoti,
  handleScheduleNotification,
  logScheduledTask,
  removeAllNoti,
  showNoti,
} from 'utils/NotificationAndroid';
import {ThemeContext} from 'context/ThemeContext';

function ToDoListApi(): JSX.Element {
  const {
    task,
    setTask,
    showModal,
    setShowModal,
    taskModel,
    setTaskModel,
    onViewCallBack,
    taskList,
    setTaskList,
    sharedViewAbleItems,
  } = useToDoApiHook();

  const {userToken} = useContext(AuthContext);
  const {sub} = jwtDecode<{
    sub: number;
  }>(userToken ?? '');
  const {isDarkMode} = useContext(ThemeContext);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('listen', {
        sub,
        socketId: socket.id,
      });
    });

    socket.on('task', e => {
      handleListScheduleNoti(e);
      setTaskList([...e]);
    });

    socket.connect();

    return () => {
      socket.off('connect');
      socket.off('listen');
      socket.off('task');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  const queryClient = useQueryClient();

  const taskQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
    onSuccess: data => {
      handleListScheduleNoti(data);
      setTaskList(data);
    },
  });
  useRefetchOnFocus(taskQuery.refetch);

  const createTaskMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: data => {
      if (socket && userToken) {
        socket.emit('task', {
          userId: sub,
        });
        handleScheduleNotification(data);
        Keyboard.dismiss();
        setTask('');
      }
      // queryClient.invalidateQueries(['tasks'], {exact: true});
    },
  });

  const handleSubmit = () => {
    createTaskMutation.mutate({
      title: task,
      isCompleted: false,
    });
  };

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? 'gainsboro' : 'white'}}>
      <ModalEditApi
        task={taskModel}
        showModal={showModal}
        setShowModal={setShowModal}
        socket={socket}
        userId={sub}
      />
      <View style={{...styles.listTask, flex: 1}}>
        {taskQuery.isLoading ? (
          <ActivityIndicator />
        ) : (
          <Animated.FlatList
            data={taskList}
            onViewableItemsChanged={onViewCallBack}
            renderItem={({item}) => (
              <TaskTileApi
                task={item}
                setShowModal={setShowModal}
                setTaskModel={setTaskModel}
                sharedViewAbleItems={sharedViewAbleItems}
                socket={socket}
                userId={sub}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{flexGrow: 1}}
            itemLayoutAnimation={Layout.springify()}
          />
        )}
      </View>
      <View style={styles.inputRow}>
        <View style={{flex: 1}}>
          <InputField
            placeholder="Write a task"
            text={task}
            setText={newText => setTask(newText)}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          {createTaskMutation.isLoading ? (
            <ActivityIndicator />
          ) : (
            <Icon name="pluscircle" size={30} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            logScheduledTask();
          }}>
          <Icon name="bars" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listTask: {flex: 1, marginVertical: 12, marginHorizontal: 12},
  inputRow: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
});

export default ToDoListApi;
