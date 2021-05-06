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
}

const initialState: MecCatState = {
  mechanic: [],
  category: []
};

type Actiontype = { type: 'UPDATE_MEC'; payload: Mechanic[] } | { type: 'UPDATE_CAT'; payload: Category[] };

export default function meccatReducer(state = initialState, action: Actiontype): MecCatState {
  // console.log(action.type)
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
    default:
      return state;
  }
}
