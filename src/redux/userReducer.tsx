export type User = {
    user_id: number,
    first_name: string,
    last_name: string,
    email: string
};

const initialState = {
    userId: null,
    firstName: '',
    lastName: '',
    userEmail: ''
};

type Actiontype = 
    | {type: 'UPDATE_USER', payload: User} 
    | {type: 'LOGOUT_USER'};

export default function userReducer(state: typeof initialState, action: Actiontype) {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state, ...action.payload
            };
        case 'LOGOUT_USER':
            return initialState;
        default: return state
    }
};