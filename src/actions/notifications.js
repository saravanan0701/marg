const addNotification = (message, type) => ({
  type: 'ADD_NOTIFICATION',
  notification: {
    message,
    type,
    key: Date.now(),
  }
});

const successNotification = (message) => addNotification(message, "success");
const warningNotification = (message) => addNotification(message, "warning");
const infoNotification = (message) => addNotification(message, "info");
const errorNotification = (message) => addNotification(message, "error");


const removeNotification = notificationId => ({
	type: 'REMOVE_NOTIFICATION',
	key: notificationId,
});

const clearAllNotification = () => ({
	type: 'CLEAR_ALL_NOTIFICATION',
});


export default {
	addNotification,
	removeNotification,
  clearAllNotification,
  
  successNotification,
  errorNotification,
  warningNotification,
  infoNotification,
}
