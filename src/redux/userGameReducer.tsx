export type Game = {
    game_id: string,
    play_count: number, 
    rating: number,
    review: string
};

const initialState = {
    games: []
};

type Actiontype = 
    | {type: 'UPDATE_GAMES', payload: Game[]}
    | {type: 'CLEAR_GAMES'} 
    

export default function userReducer(state: typeof initialState, action: Actiontype) {
    switch (action.type) {
        case 'UPDATE_GAMES':
            return {
                ...state, ...action.payload
            };
        case 'CLEAR_GAMES':
            return initialState;
        default: return state
    }
};