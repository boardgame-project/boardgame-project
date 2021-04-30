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
    username: '',
};

type Actiontype = { type: 'UPDATE_USER'; payload: User } | { type: 'LOGOUT_USER' };

export default function userReducer(state = initialState, action: Actiontype): User {
    console.log(action.type);
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                ...action.payload,
            };
        case 'LOGOUT_USER':
            return initialState;
        default:
            return state;
    }
}
export {};
