import { TStatetUser, TUserActions, UserActionTypes } from "./types";

export const initialState: TStatetUser = {
    users: [],
};

export function reducer(state: TStatetUser, action: TUserActions): TStatetUser {
    switch (action.type) {
        case UserActionTypes.ADD_USER:
            if (Array.isArray(action.payload)) {
                return { ...state, users: [...action.payload] };
            } else {
                return { ...state, users: [...state.users, action.payload] };
            }

        case UserActionTypes.DELETE_USER:
            return { ...state, users: state.users.filter(user => user.id !== action.payload) };

        case UserActionTypes.UPDATE_USER:
            return {...state,users: state.users.map(user => user.id === action.payload.id ? action.payload : user)};

        default:
            return state;
    }
}
