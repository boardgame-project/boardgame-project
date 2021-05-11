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

type Actiontype = { type: 'UPDATE_USER'; payload: User } | { type: 'LOGOUT_USER' };

export default function userReducer(state = initialState, action: Actiontype): User {
  // console.log(action);
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user_id: action.payload.user_id,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        username: action.payload.username
      };
    case 'LOGOUT_USER':
      return initialState;
    default:
      return state;
  }
}
export {};
