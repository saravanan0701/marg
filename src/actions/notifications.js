const addNotification = message => ({
  type: 'ADD_NOTIFICATION',
  notification: {
    message,
    id: Date.now(),
  }
});

const removeNotification = notificationId => ({
	type: 'REMOVE_NOTIFICATION',
	id: notificationId,
});

const clearAllNotification = () => ({
	type: 'CLEAR_ALL_NOTIFICATION',
});


export default {
	addNotification,
	removeNotification,
	clearAllNotification,
}
