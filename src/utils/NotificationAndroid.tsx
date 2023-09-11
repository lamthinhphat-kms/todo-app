import {format} from 'date-fns';
import {ITask} from 'models/ITask';
import PushNotification from 'react-native-push-notification';

const handleScheduleNotification = (task: ITask) => {
  if (task.deadline) {
    PushNotification.getScheduledLocalNotifications(notifications => {
      if (
        !notifications.some(function (noti) {
          return noti.id === task.id;
        }) &&
        !task.isCompleted &&
        new Date(task.deadline!) > new Date()
      ) {
        const date = new Date(task.deadline!);
        date.setDate(date.getDate());
        date.setHours(0, 0, 0, 0);
        PushNotification.localNotificationSchedule({
          channelId: 'phat_lam',
          id: task.id,
          title: 'Task expire today',
          message: task.title,
          date: date,
          // date: new Date(Date.now() + 5 * 1000),
        });
      } else {
        if (task.isCompleted) {
          removeNotiById(task);
        }
      }
    });
  }
};

const handleListScheduleNoti = (taskList: ITask[]) => {
  taskList.forEach((task, index) => {
    handleScheduleNotification(task);
  });
};

const removeAllNoti = () => {
  PushNotification.cancelAllLocalNotifications();
};

const removeNotiById = (task: ITask) => {
  PushNotification.cancelLocalNotification(task.id);
};

const logScheduledTask = () => {
  PushNotification.getScheduledLocalNotifications(notifications => {
    notifications.forEach(noti => {
      console.log(
        noti.id,
        noti.message,
        format(noti.date, 'dd/MM/yyyy HH:mm:ss'),
      );
    });
  });
};

const showNoti = () => {
  PushNotification.getChannels(channelId => {
    channelId.forEach(id => console.log(id));
  });
  PushNotification.localNotification({
    channelId: 'phat_lam',
    title: '123',
    message: '123',
  });
};

export {
  handleScheduleNotification,
  handleListScheduleNoti,
  removeAllNoti,
  removeNotiById,
  logScheduledTask,
  showNoti,
};
