const INITIAL_NOTIFICATION_STATE = {
  messages:[],
}

export const NotificationReducer = (state = INITIAL_NOTIFICATION_STATE, action) => {
  switch(action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        messages: state.messages.concat({
          id: action.notification.id,
          message: action.notification.message,
        }),
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        message: state.reduce((acc, it) => {
          if(it.id !== action.id) {
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