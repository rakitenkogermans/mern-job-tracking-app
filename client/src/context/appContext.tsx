import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import { AppActionTypes } from './actions';
import { CurrentUser, ResponseUser, StateType } from '../types/types';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

const initialState: StateType = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: null,
    displayAlert: function () {},
    registerUser: async function () {},
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
};

const AppContext = createContext<StateType>(initialState);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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

    const registerUser = async (currentUser: CurrentUser) => {
        dispatch({ type: AppActionTypes.REGISTER_USER_BEGIN });
        try {
            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                body: JSON.stringify(currentUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.msg);
            }
            const { user, token, location } = data;
            dispatch({ type: AppActionTypes.REGISTER_USER_SUCCESS, payload: { user, token, location } });
            addUserToLocalStorage({ user, token, location });
        } catch (err) {
            console.log(err);
            if (err instanceof Error) dispatch({ type: AppActionTypes.REGISTER_USER_ERROR, payload: { msg: err.message } });
        }
        clearAlert();
    };

    return <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
