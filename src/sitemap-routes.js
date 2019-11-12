
import React from 'react';

import { Route, Switch } from 'react-router';

export default (
  <Switch>
    <Route exact path="/" />
    <Route exact path="/categories" />
    <Route exact path="/product/:id" />
    <Route exact path="/login" />
    <Route exact path="/signup" />
    <Route exact path="/aboutus" />
    <Route exact path="/team" />
    <Route exact path="/advertise" />
    <Route exact path="/collaborate" />
    <Route exact path="/supporters" />
    <Route exact path="/trustees" />
    <Route exact path="/contactus" />
    <Route exact path="/donate" />
    <Route path="/checkout" />
    {/* <ProtectedRoute exact path="/myaccount" /> */}
    <Route exact path="/search" />
    <Route path="/reset-password" />
    <Route path="/privacy-policy" />
    <Route path="/terms-and-conditions" />
    <Route path="*" />
  </Switch>
)