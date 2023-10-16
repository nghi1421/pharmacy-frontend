import { combineReducers } from 'redux';

import { AlertReducer, IAlertState as AlertState } from './AlertReducer';
import { AuthReducer, IAuthState as AuthState } from './AuthReducer';
    
interface RootStateType {
    readonly alert: AlertState;
    readonly auth: AuthState;
}

const rootReducer = combineReducers<RootStateType>({
    alert: AlertReducer,
    auth: AuthReducer,
});

export default rootReducer;