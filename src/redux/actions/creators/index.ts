import { ThunkAction } from 'redux-thunk';

import { RootState } from '../../store/store';
import { Action as AuthActions } from '../types/AuthTypes';

export type RootActions = 
    | AuthActions

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;