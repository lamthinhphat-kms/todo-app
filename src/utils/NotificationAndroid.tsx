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
        !task.isCompleted
      ) {
        const date = new Date(task.deadline!);
        date.setDate(date.getDate() - 1);
        date.setHours(0, 0, 0, 0);
        PushNotification.localNotificationSchedule({
          id: task.id,
          title: 'Task near expired',
          message: task.title,
          date: date,
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

export {
  handleScheduleNotification,
  handleListScheduleNoti,
  removeAllNoti,
  removeNotiById,
  logScheduledTask,
};
