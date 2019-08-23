import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { withSnackbar } from 'notistack';

const NotificationManager = ({
  messages = [],
  removeNotification,
  enqueueSnackbar,
}) => {

  const [ localMessages, setLocalMessages ] = useState([]);
  const checkIfLocalMessage = (key) => localMessages.find(({key: localKey}) => {
    console.log(key, localKey);
    return key === localKey
  });

  messages.forEach(
    ({key, message}) => {
      if(checkIfLocalMessage(key)) {
        return;
      }
      setLocalMessages([
        ...messages,
        {
          key,
          message
        },
      ]);
      console.log("..........................");
      console.log(key, message);
      return enqueueSnackbar(
        message,
        {
          key,
          variant: "success",
          onClose: () => removeNotification(key),
          action: key => (
            <FontAwesome name="close" onClick={() => removeNotification(key)} />
          )
        }
      )
    }
  );
  
  return null
}

export default withSnackbar(NotificationManager);