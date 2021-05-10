import axios from 'axios';

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

const initialState: User = {
  user_id: 0,
  first_name: '',
  last_name: '',
  email: '',
  username: ''
};

const GET_USER = 'GET_USER';

const getUserSession = (): Promise<User> =>  {
  const user = axios.get('/api/auth/user') 
  .then(res => res.data)
  .catch(err => console.log(err))
  return user
};

export const getUser = (): PromiseActionType => {
  console.log('getUser hit')
  const user = getUserSession()
  console.log(user)
  return {
    type: GET_USER,
    payload: user
  }
};

type PromiseActionType = {
  type: 'GET_USER';
  payload: Promise<User>;
};

type Actiontype = { type: 'UPDATE_USER'; payload: User } | { type: 'GET_USER'; payload: User } | { type: 'LOGOUT_USER' };

export default function userReducer(state = initialState, action: Actiontype): User {
  console.log(action.type)
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        ...action.payload
      };
    case 'GET_USER' + '_PENDING':
      return state;
    case 'GET_USER' + '_FULLFILLED':
      return {
        ...state,
        ...action.payload
      };
    case 'GET_USER' + '_REJECTED':
      return state;
    case 'LOGOUT_USER':
      return initialState;
    default:
      return state;
  }
}
export {};
