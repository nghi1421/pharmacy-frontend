import { Reducer } from 'redux';

import { IAuth as Auth } from '../../models/Auth';
import { User } from '../../types/User';
import { Action, ActionType } from '../actions/types/AuthTypes';


export interface IAuthState {
    accessToken: string
    refreshToken: string
    data : User | undefined | null;
    loading: boolean;
    error? : string | null;
}

const initialState = {
    accessToken: "123",
    refreshToken: "",
    data : null , 
    loading: false,
    error : null
}

export const AuthReducer: Reducer<IAuthState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.AUTH_START:
            return { ...state, loading: true };
        case ActionType.AUTH_SUCCESS:
            const auth: Auth = action.payload
            return {
                ...state,
                accessToken: auth.accessToken, 
                refrehsToken: auth.refreshToken,
                data : auth.data ,
                error : null , 
                loading: false
            };
        case ActionType.AUTH_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        default:
            return state;
    }
};