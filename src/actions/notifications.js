const addNotification = message => ({
  type: 'ADD_NOTIFICATION',
  notification: {
    message,
    key: Date.now(),
  }
});

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
}
