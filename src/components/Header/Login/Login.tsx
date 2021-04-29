import axios from 'axios';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';


const Login: React.FC = () => {
  
  interface User {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string
  }

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginEmail, setLoginEmail] = useState<string>('')
  const [loginPassword, setLoginPassword] = useState<string>('')

  const dispatch = useDispatch();

  const register = ():void => {
    axios.post<User>('/api/auth/register', {firstName, lastName, email, password})
    .then(res => {
      const user = res.data
      // console.log(res.data)
      dispatch({type: 'UPDATE_USER', action: user})
    })
  };

  //needs to be checked
  const registerEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(+e.key === 13) {
      register()
    }
  }

  const login = ():void => {
    axios.post<User>('/api/auth/login', {loginEmail, loginPassword})
    .then(res => {
      const user = res.data
      // console.log(res.data)
      dispatch({type: 'UPDATE_USER', action: user})
    })
  };

  //needs to be checked
  const loginEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(+e.key === 13) {
      login()
    }
  }


  return (
    <div className='loginContainer'>
      <form className='register'>
        <h3>register</h3>
        <label htmlFor='firstName'>first name:</label>
        <input
          id='firstName'
          value={firstName} 
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>,
            ): void => setFirstName(e.target.value)}/>
        <label htmlFor='lastName'>last name:</label>
        <input
          id='lastName'
          value={lastName} 
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>,
            ): void => setLastName(e.target.value)}/>
        <label htmlFor='email'>email:</label>
        <input
          id='email'
          value={email} 
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>,
            ): void => setEmail(e.target.value)}/>
        <label htmlFor='password'>password:</label>
        <input
          id='password'
          value={password} 
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>,
            ): void => setPassword(e.target.value)}
            onKeyPress={registerEnterPress}
            />
          <button onClick={register} type='submit'>register</button>
      </form>
      <form> 
        <h3>login</h3>
        <label htmlFor='loginEmail'>email:</label>
        <input
          id='loginEmail'
          value={loginEmail} 
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>,
            ): void => setLoginEmail(e.target.value)}/>
        <label htmlFor='loginPassword'>password:</label>
        <input
          id='loginPassword'
          value={loginPassword} 
          onChange={(
            e: React.ChangeEvent<HTMLInputElement>,
            ): void => setLoginPassword(e.target.value)}
            onKeyPress={loginEnterPress}
            />
          <button onClick={login} type='submit'>login</button>
      </form>
    </div>)
}

export default Login