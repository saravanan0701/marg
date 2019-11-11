import React, { useEffect, useState } from "react";
import { withApollo } from "react-apollo";
import { getDiaryId } from "./../utils/";

export const DiaryContext = React.createContext({
  diaryId: null,
});

export const DiaryProvider = withApollo(({children, client}) => {
  const [ id, setId ] = useState(null);

  useEffect(() => {
    getDiaryId(client).then((diaryId) => setId(diaryId))
  }, []);

  return (
    <DiaryContext.Provider value={id}>
      {children}
    </DiaryContext.Provider>
  )
});