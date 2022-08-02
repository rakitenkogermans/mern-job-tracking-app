import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import { AppActionTypes } from './actions';
import { ResponseUser, SetupUserType, StateType, User } from '../types/types';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

const initialState: StateType = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: null,
    displayAlert: function () {},
    setupUser: async function () {},
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
    showSidebar: false,
    toggleSidebar: function () {},
    logoutUser: function () {},
    updateUser: async function () {},
};

const AppContext = createContext<StateType>(initialState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
        baseURL: '/api/v1',
    });

    // request
    authFetch.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers['Authorization'] = `Bearer ${state.token}`;
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    // response
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (err) => {
            console.log(err);
            if (err.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(err);
        }
    );

    const displayAlert = () => {
        dispatch({ type: AppActionTypes.DISPLAY_ALERT });
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: AppActionTypes.CLEAR_ALERT,
            });
        }, 5000);
    };

    const addUserToLocalStorage = ({ user, token, location }: ResponseUser) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
    };

    const setupUser = async ({ currentUser, endPoint, alertText }: SetupUserType) => {
        dispatch({ type: AppActionTypes.SETUP_USER_BEGIN });
        try {
            const { data } = await axios.post<ResponseUser>(`/api/v1/auth/${endPoint}`, currentUser);
            const { user, token, location } = data;
            dispatch({ type: AppActionTypes.SETUP_USER_SUCCESS, payload: { user, token, location, alertText } });
            addUserToLocalStorage({ user, token, location });
        } catch (err) {
            console.log(err);
            if (err instanceof AxiosError) dispatch({ type: AppActionTypes.SETUP_USER_ERROR, payload: { msg: err.response?.data.msg } });
        }
        clearAlert();
    };

    const toggleSidebar = () => {
        dispatch({ type: AppActionTypes.TOGGLE_SIDEBAR });
    };

    const logoutUser = () => {
        dispatch({ type: AppActionTypes.LOGOUT_USER });
        removeUserFromLocalStorage();
    };

    const updateUser = async (currentUser: User) => {
        dispatch({ type: AppActionTypes.UPDATE_USER_BEGIN });
        try {
            const { data } = await authFetch.patch<ResponseUser>('/auth/updateUser', currentUser);
            const { user, token, location } = data;
            dispatch({ type: AppActionTypes.UPDATE_USER_SUCCESS, payload: { user, token, location } });
            addUserToLocalStorage({ user, token, location });
        } catch (err) {
            console.log(err);
            if (err instanceof AxiosError) {
                if (err.response?.status !== 401) {
                    dispatch({ type: AppActionTypes.UPDATE_USER_ERROR, payload: { msg: err.response?.data.msg } });
                }
            }
        }
        clearAlert();
    };

    return <AppContext.Provider value={{ ...state, displayAlert, setupUser, toggleSidebar, logoutUser, updateUser }}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
