import { AppAction, AppActionTypes } from './actions';
import { StateType } from './appContext';
import React from 'react';

const reducer: React.Reducer<StateType, AppAction> = (state, action) => {
    if (action.type === AppActionTypes.DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!',
        };
    }
    if (action.type === AppActionTypes.CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: null,
            alertText: '',
        };
    }
    throw new Error(`no such action :${action.type}`);
};

export default reducer;
