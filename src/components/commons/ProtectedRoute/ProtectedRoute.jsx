import React from 'react'
import { Route, Redirect } from "react-router-dom"

export const ProtectedRoute = (props) => {
  const {
    component: Component,
    isLoading,
    isLoggedIn,
    location,
  } = props;
  return <Route
    render={
      (props) => {
        if(isLoading) {
          return <h4>Please wait! Logging you in..</h4>
        }
        return isLoggedIn === true ?
        <Component {...props} />
        :
        <Redirect to={{pathname: '/login', state: {from: location}}} />
      }
    }
  />
}