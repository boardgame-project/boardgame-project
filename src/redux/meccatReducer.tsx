type Rating = {
  game_id: string;
  average_rating: number;
};

export type GameRatings = Rating[];
export interface Mechanic {
  id: string;
  name: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  url: string;
}

export interface MecCatState {
  mechanic: Mechanic[];
  category: Category[];
  rating: GameRatings;
}

const initialState: MecCatState = {
  mechanic: [],
  category: [],
  rating: []
};

type Actiontype =
  | { type: 'UPDATE_MEC'; payload: Mechanic[] }
  | { type: 'UPDATE_CAT'; payload: Category[] }
  | { type: 'UPDATE_RATINGS'; payload: GameRatings };

export default function meccatReducer(state = initialState, action: Actiontype): MecCatState {
  switch (action.type) {
    case 'UPDATE_MEC':
      return {
        ...state,
        mechanic: action.payload
      };
    case 'UPDATE_CAT':
      return {
        ...state,
        category: action.payload
      };
    case 'UPDATE_RATINGS':
      return {
        ...state,
        rating: action.payload
      };
    default:
      return state;
  }
}
