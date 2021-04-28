type User = {
    userId: number,
    firstName: string,
    lastName: string,
    userEmail: string
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