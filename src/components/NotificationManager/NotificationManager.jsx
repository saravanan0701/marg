import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { withSnackbar } from 'notistack';

const NotificationManager = ({
  messages = [],
  removeNotification,
  enqueueSnackbar,
  closeSnackbar,
}) => {

  const [ localMessages, setLocalMessages ] = useState([]);
  const checkIfLocalMessage = (key) => localMessages.find(({key: localKey}) => (key === localKey));

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
      return enqueueSnackbar(
        message,
        {
          key,
          variant: "success",
          onClose: () => removeNotification(key),
          action: key => (
            <FontAwesome className="cursor-pointer" name="close" onClick={
              () => {
                closeSnackbar(key);
                removeNotification(key);
              }
            } />
          )
        }
      )
    }
  );
  
  return null
}

export default withSnackbar(NotificationManager);