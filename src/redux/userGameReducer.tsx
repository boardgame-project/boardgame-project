export interface Game {
    game_id: string;
    play_count: number;
    rating: number;
    review: string;
}

export interface GameState {
    games: Game[];
}

const initialState: GameState = {
    games: [],
};

type Actiontype = { type: 'UPDATE_GAMES'; payload: Game[] } | { type: 'CLEAR_GAMES' };

export default function userReducer(state = initialState, action: Actiontype): GameState {
    switch (action.type) {
        case 'UPDATE_GAMES':
            return {
                ...state,
                ...action.payload,
            };
        case 'CLEAR_GAMES':
            return initialState;
        default:
            return state;
    }
}

export {};
