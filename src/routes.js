import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import User from './components/User/User'
import GameLibrary from './components/Games/GameLibrary'

export default (
  <Switch>
    <Route exact path='/' component={Header} />
    <Route  path='/user' component={User} />
    <Route path='/game' component={GameLibrary} />
  </Switch>
)