import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { withSnackbar } from 'notistack';

const TYPES = ["info", "success", "error", "warning"]

const validateType = (type) => TYPES.find((typeIt) => typeIt === type) || TYPES[0]

const NotificationManager = ({
  messages = [],
  removeNotification,
  enqueueSnackbar,
  closeSnackbar,
}) => {

  const [ localMessages, setLocalMessages ] = useState([]);
  const checkIfLocalMessage = (key) => localMessages.find(({key: localKey}) => (key === localKey));

  messages.forEach(
    ({key, message, type}) => {
      if(checkIfLocalMessage(key)) {
        return;
      }
      setLocalMessages([
        ...messages,
        {
          key,
          message,
          type,
        },
      ]);
      return enqueueSnackbar(
        message,
        {
          key,
          variant: validateType(type),
          anchorOrigin: { vertical: 'top', horizontal: 'right', },
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