import React from 'react';
import { Route, Switch } from 'react-router-dom';
import User from './components/User/User';
import GameLibrary from './components/Games/GameLibrary';
import Login from './components/Header/Login';
import GameDisplay from './components/Games/GameDisplay';
import MyAccount from './components/User/MyAccount';
import ItemDisplay from './components/User/ItemDisplay';

export default (
  <Switch>
    <Route path='/' component={GameLibrary} />
    <Route path='/auth' component={Login} />
    <Route  path='/user' component={User} />
    <Route path='/game' component={GameDisplay} />
    <Route path='/account' component={MyAccount} />
  </Switch>
)