import { AppAction, AppActionTypes } from './actions';
import React from 'react';
import { StateType } from '../types/types';

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

    if (action.type === AppActionTypes.SETUP_USER_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === AppActionTypes.SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload?.token || null,
            user: action.payload?.user || null,
            userLocation: action.payload?.location || '',
            jobLocation: action.payload?.location || '',
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText,
        };
    }

    if (action.type === AppActionTypes.SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        };
    }

    throw new Error(`no such action :${action.type}`);
};

export default reducer;
