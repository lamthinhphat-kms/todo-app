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

function ToDoListApi(): JSX.Element {
  const {
    task,
    setTask,
    showModal,
    setShowModal,
    taskModel,
    setTaskModel,
    onViewCallBack,
    sharedViewAbleItems,
  } = useToDoApiHook();

  const queryClient = useQueryClient();

  const taskQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getTasks,
  });
  useRefetchOnFocus(taskQuery.refetch);

  // const taskQuery = useReactNavigationQuery(['tasks'], getTasks, {
  //   refetchOnWindowFocus: true,
  // });

  const createTaskMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: data => {
      queryClient.invalidateQueries(['tasks'], {exact: true});
      Keyboard.dismiss();
      setTask('');
    },
  });

  const handleSubmit = () => {
    createTaskMutation.mutate({
      title: task,
      isCompleted: false,
    });
  };

  return (
    <View style={{flex: 1}}>
      <ModalEditApi
        task={taskModel}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <View style={{...styles.listTask, flex: 1}}>
        {taskQuery.isLoading ? (
          <ActivityIndicator />
        ) : (
          <Animated.FlatList
            data={taskQuery.data}
            onViewableItemsChanged={onViewCallBack}
            renderItem={({item}) => (
              <TaskTileApi
                task={item}
                setShowModal={setShowModal}
                setTaskModel={setTaskModel}
                sharedViewAbleItems={sharedViewAbleItems}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{flexGrow: 1}}
            itemLayoutAnimation={Layout.springify()}
          />
        )}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={task}
          onChangeText={value => setTask(value)}
        />
        <TouchableOpacity onPress={handleSubmit}>
          {createTaskMutation.isLoading ? (
            <ActivityIndicator />
          ) : (
            <Icon name="pluscircle" size={30} />
          )}
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
