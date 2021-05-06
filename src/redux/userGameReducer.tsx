import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { DBGame } from 'customTypes';
const { REACT_APP_CLIENT_ID } = process.env;

export interface APIGame {
  id: string;
  image_url: string;
  description: string;
  mechanics: string;
  categories: string;
  min_age: number;
  min_players: number;
  max_players: number;
  year_published: number;
}

export interface UserGame {
  game_id: string;
  play_count: number;
  rating: number;
  review: string;
  image_url: string;
  description: string;
  mechanics: string;
  categories: string;
  min_age: number;
  min_players: number;
  max_players: number;
  year_published: number;
}

export interface GameState {
  userGames: UserGame[];
}

const initialState: GameState = {
  userGames: [
    {
      game_id: '',
      play_count: 0,
      rating: 0,
      review: '',
      image_url: '',
      description: '',
      mechanics: '',
      categories: '',
      min_age: 0,
      min_players: 0,
      max_players: 0,
      year_published: 0
    }
  ]
};

const CLEAR_GAMES = 'CLEAR_GAMES';
const UPDATE_USER_GAMES = 'UPDATE_USER_GAMES';

const apiLogic = async (): Promise<UserGame[]> => {
  const dbGames: DBGame[] = await axios
    .get('/api/usergame')
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  const userGameIds = dbGames.map((elem: DBGame) => {
    return elem.game_id;
  });

  const apiGames: APIGame[] = await axios
    .get(
      //prettier-ignore
      `https://api.boardgameatlas.com/api/search?ids=${userGameIds.join(',')}&fields=id,year_published,min_players,max_players,min_age,mechanics,categories,description,image_url&client_id=${REACT_APP_CLIENT_ID}`
    )
    .then((res) => {
      return res.data.games;
    })
    .catch((err) => console.log(err));

  const userGames: UserGame[] = dbGames.map((dbElem: DBGame) => {
    const matched: APIGame = apiGames.reduce(
      (acc: APIGame, apiElem: APIGame): APIGame => {
        if (dbElem.game_id === apiElem.id) {
          (acc.id = apiElem.id),
            (acc.image_url = apiElem.image_url),
            (acc.description = apiElem.description),
            (acc.mechanics = apiElem.mechanics),
            (acc.categories = apiElem.categories),
            (acc.min_age = apiElem.min_age),
            (acc.min_players = apiElem.min_players),
            (acc.max_players = apiElem.max_players),
            (acc.year_published = apiElem.year_published);
        }
        return acc;
      },
      {
        id: '',
        image_url: '',
        description: '',
        mechanics: '',
        categories: '',
        min_age: 0,
        min_players: 0,
        max_players: 0,
        year_published: 0
      }
    );

    return {
      game_id: matched.id,
      play_count: dbElem.play_count,
      rating: dbElem.rating,
      review: dbElem.review,
      image_url: matched.image_url,
      description: matched.description,
      mechanics: matched.mechanics,
      categories: matched.categories,
      min_age: matched.min_age,
      min_players: matched.min_players,
      max_players: matched.max_players,
      year_published: matched.year_published
    };
  });
  return userGames;
};

export const getUserGames = (): PromiseActionType => {
  const userGames = apiLogic();
  return {
    type: UPDATE_USER_GAMES,
    payload: userGames
  };
};

type PromiseActionType = {
  type: 'UPDATE_USER_GAMES';
  payload: Promise<UserGame[]>;
};

type Actiontype =
  | {
      type: 'UPDATE_USER_GAMES';
      payload: UserGame[];
    }
  | { type: 'CLEAR_GAMES'; payload: [] };

export default function userGameReducer(state = initialState, action: Actiontype): GameState {
  switch (action.type) {
    case UPDATE_USER_GAMES + '_PENDING':
      return state;
    case UPDATE_USER_GAMES + '_FULFILLED':
      return { ...state, ...{ userGames: action.payload } };
    case UPDATE_USER_GAMES + '_REJECTED':
      return state;
    case CLEAR_GAMES:
      return initialState;
    default:
      return state;
  }
}

export {};
