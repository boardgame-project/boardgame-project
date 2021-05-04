declare module 'customTypes' {
    export type Option = {
        id: string;
        name: string;
        url: string;
    };

    export type Review = {
        username?: string;
        rating?: string;
        review?: string[] | null;
    };

    export type ThumbGame = {
        game_id: string;
        name: string;
        thumb_url: string;
        avgRating: number;
    };

    export type GameRatings = [
        {
            game_id: string;
            average_rating: number;
        },
    ];

    export type PlayerCount = {
        username?: string;
        total?: number;
    };

    export type GameBoxProps = {
        thumbGame: ThumbGame;
      };

    export type GameDispProps = {
        thumbGame: ThumbGame;
      };

    export type Reviews = {
        user_id?: number;
        game_id?: string;
        review?: Array<string> | null;
      };

    export type SearchProps = {
        getAPIGames: (
          searchEntry: string,
          mechanicsSelections: string[],
          categoriesSelections: string[],
          itemsPerPage: string
        ) => void;
      };
    
    export type Players = {
        username?: string;
        total?: number;
      };

    export interface User {
        firstName?: string;
        lastName?: string;
        email: string;
        username: string;
        password: string;
      };

    export type UserReview = {
        review?: string,
      };
}