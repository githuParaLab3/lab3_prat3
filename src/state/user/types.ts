import { TUserAttr } from "@/src/model/user";

// action types
export enum UserActionTypes {
    ADD_USER = "ADD_USER",
    DELETE_USER = "DELETE_USER",
    UPDATE_USER = "UPDATE_USER",  
}

type DeleteUserAction = { type: UserActionTypes.DELETE_USER, payload: string };
type AddUserAction = { type: UserActionTypes.ADD_USER, payload: TUserAttr | TUserAttr[] };
type UpdateUserAction = { type: UserActionTypes.UPDATE_USER, payload: TUserAttr };

export type TUserActions = AddUserAction | DeleteUserAction | UpdateUserAction;

// state types
export type TStatetUser = {
    users: TUserAttr[];
};

// reducer dispatch
export type TUserDispatch = {
    state: TStatetUser;
    dispatch: React.Dispatch<TUserActions>;
};
