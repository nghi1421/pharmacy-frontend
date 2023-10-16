import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import axiosClient from '../../../services/axios';

import { IAuth as Auth } from '../../../models/Auth';
import { ThunkResult } from './index';
import { 
    Action,
    ActionType, 
    IAuthFail, 
    IAuthStart, 
    IAuthSuccess 
} from '../types/AuthTypes';

type Config = {
    headers: Record<string, string>
};
   
export const AuthStart = (username: string, password: string): ThunkResult<void> => 
    async (dispatch: Dispatch<Action>) => {
        dispatch<IAuthStart>({ type: ActionType.AUTH_START 
    });
        
    const config: Config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
        
    const body = JSON.stringify({
        username,
        password
    });
        
    try {
        const response: AxiosResponse<Auth> = await axiosClient.post(`login`, body, config);
        dispatch<IAuthSuccess>({
            type: ActionType.AUTH_SUCCESS,
            payload: response.data
        });
    } catch (err: any) {
        dispatch<IAuthFail>({
            type: ActionType.AUTH_FAIL,
            payload: err
        });    
    }
};



