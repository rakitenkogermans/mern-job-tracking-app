import { AppAction, AppActionTypes } from './actions';
import React from 'react';
import { StateType } from '../types/types';
import { initialState } from './appContext';

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

    if (action.type === AppActionTypes.UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === AppActionTypes.UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload?.token || null,
            user: action.payload?.user || null,
            userLocation: action.payload?.location || '',
            jobLocation: action.payload?.location || '',
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated',
        };
    }

    if (action.type === AppActionTypes.UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        };
    }

    if (action.type === AppActionTypes.TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        };
    }

    if (action.type === AppActionTypes.LOGOUT_USER) {
        return { ...initialState, user: null, token: null, userLocation: '', jobLocation: '' };
    }

    if (action.type === AppActionTypes.HANDLE_CHANGE) {
        return { ...state, [action.payload.name]: action.payload.value };
    }

    if (action.type === AppActionTypes.CLEAR_VALUES) {
        return {
            ...state,
            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending',
        };
    }

    if (action.type === AppActionTypes.CREATE_JOB_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === AppActionTypes.CREATE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Job Created!',
        };
    }
    if (action.type === AppActionTypes.CREATE_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        };
    }

    if (action.type === AppActionTypes.GET_JOB_BEGIN) {
        return { ...state, isLoading: true, showAlert: false };
    }

    if (action.type === AppActionTypes.GET_JOB_SUCCESS) {
        return { ...state, isLoading: false, jobs: action.payload.jobs, totalJobs: action.payload.totalJobs, numOfPages: action.payload.numOfPages };
    }

    throw new Error(`no such action :${action.type}`);
};

export default reducer;
