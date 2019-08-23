const INITIAL_NOTIFICATION_STATE = {
  messages:[],
}

export const NotificationReducer = (state = INITIAL_NOTIFICATION_STATE, action) => {
  switch(action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        messages: state.messages.concat({
          key: action.notification.key,
          message: action.notification.message,
          type: action.notification.type,
        }),
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        messages: state.messages.reduce((acc, it) => {
          if(it.key !== action.key) {
            return acc.concat(it);
          }
          return acc;
        }, []),
      };
    
    case 'CLEAR_ALL':
      return {
        ...INITIAL_NOTIFICATION_STATE,
      };
    
    default:
      return state;
  }
};