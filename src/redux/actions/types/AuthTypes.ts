import { IAuth as Auth } from "../../../models/Auth"; 

export enum ActionType {
    AUTH_START = 'start',
    AUTH_SUCCESS = 'success',
    AUTH_FAIL = 'fail',
}

export interface IAuthStart {
    type: ActionType.AUTH_START;
}
export interface IAuthSuccess {
    type: ActionType.AUTH_SUCCESS;
    payload: Auth;
}
export interface IAuthFail {
    type: ActionType.AUTH_FAIL;
    payload: string | null;
}

export type Action =
    | IAuthStart
    | IAuthSuccess
    | IAuthFail;
