import React from 'react';
import User from './components/User/User/User';
import GameLibrary from './components/Games/GameLibrary/GameLibrary';
import Login from './components/Header/Login/Login';
import GameDisplay from './components/Games/GameDisplay/GameDisplay';
import MyAccount from './components/User/MyAccount/MyAccount';
import ItemDisplay from './components/User/ItemDisplay/ItemDisplay';
import { Route, Switch } from 'react-router-dom';

export default (
  <Switch>
    <Route exact path='/' component={GameLibrary} />
    <Route path='/auth' component={Login} />
    <Route  path='/user' component={User} />
    <Route path='/game' component={GameDisplay} />
    <Route path='/account' component={MyAccount} />
  </Switch>
)