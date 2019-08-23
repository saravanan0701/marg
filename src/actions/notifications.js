const addNotification = notification => ({
  type: 'ADD_NOTIFICATION',
  notification
});

const removeNotification = notificationId => ({
	type: 'REMOVE_NOTIFICATION',
	id,
});

const clearAllNotification = notificationId => ({
	type: 'CLEAR_ALL_NOTIFICATION',
	id,
});


export default {
	addNotification,
	removeNotification,
	clearAllNotification,
}
