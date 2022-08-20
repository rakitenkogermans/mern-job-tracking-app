import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import { AppActionTypes } from './actions';
import {
    DefaultStats,
    JobTypeEnum,
    ResponseJob,
    ResponseStats,
    ResponseUser,
    SearchAll,
    SetupUserType,
    SortOptionsEnum,
    StateType,
    StatusEnum,
    User,
} from '../types/types';
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

    showSidebar: false,
    toggleSidebar: function () {},
    logoutUser: function () {},
    updateUser: async function () {},

    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: userLocation || '',
    jobTypeOptions: JobTypeEnum,
    jobType: JobTypeEnum.FULL_TIME,
    statusOptions: StatusEnum,
    status: StatusEnum.PENDING,
    handleChange: function () {},
    clearValues: function () {},
    createJob: async function () {},
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    getJobs: async function () {},
    setEditJob: function () {},
    deleteJob: async function () {},
    editJob: async function () {},
    stats: {} as DefaultStats,
    monthlyApplications: [],
    showStats: async function () {},
    search: '',
    searchStatus: SearchAll.ALL,
    searchType: SearchAll.ALL,
    sort: SortOptionsEnum.LATEST,
    sortOptions: SortOptionsEnum,
    clearFilters: function () {},
    changePage: function () {},
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
            const { data } = await axios.post<ResponseUser>(
                `/api/v1/auth/${endPoint}`,
                currentUser
            );
            const { user, token, location } = data;
            dispatch({
                type: AppActionTypes.SETUP_USER_SUCCESS,
                payload: { user, token, location, alertText },
            });
            addUserToLocalStorage({ user, token, location });
        } catch (err) {
            if (err instanceof AxiosError)
                dispatch({
                    type: AppActionTypes.SETUP_USER_ERROR,
                    payload: { alertText: err.response?.data.msg },
                });
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
            dispatch({
                type: AppActionTypes.UPDATE_USER_SUCCESS,
                payload: { user, token, location },
            });
            addUserToLocalStorage({ user, token, location });
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status !== 401) {
                    dispatch({
                        type: AppActionTypes.UPDATE_USER_ERROR,
                        payload: { alertText: err.response?.data.msg },
                    });
                }
            }
        }
        clearAlert();
    };

    const handleChange = (name: string, value: string) => {
        dispatch({ type: AppActionTypes.HANDLE_CHANGE, payload: { name, value } });
    };

    const clearValues = () => {
        dispatch({ type: AppActionTypes.CLEAR_VALUES });
    };

    const createJob = async () => {
        dispatch({ type: AppActionTypes.CREATE_JOB_BEGIN });
        try {
            const { position, company, jobLocation, jobType, status } = state;
            await authFetch.post('/jobs', { position, company, jobLocation, jobType, status });
            dispatch({ type: AppActionTypes.CREATE_JOB_SUCCESS });
            clearValues();
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status !== 401) {
                    dispatch({
                        type: AppActionTypes.CREATE_JOB_ERROR,
                        payload: { alertText: err.response?.data.msg },
                    });
                }
            }
        }
        clearAlert();
    };

    const getJobs = async () => {
        const { search, searchStatus, searchType, sort, page } = state;
        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
        if (search) {
            url += `&search=${search}`;
        }
        dispatch({ type: AppActionTypes.GET_JOB_BEGIN });

        try {
            const { data } = await authFetch.get<ResponseJob>(url);
            const { jobs, totalJobs, numOfPages } = data;
            dispatch({
                type: AppActionTypes.GET_JOB_SUCCESS,
                payload: { jobs, totalJobs, numOfPages },
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                logoutUser();
            }
        }
    };

    const setEditJob = (id: string) => {
        dispatch({ type: AppActionTypes.SET_EDIT_JOB, payload: { id } });
    };

    const editJob = async () => {
        dispatch({ type: AppActionTypes.EDIT_JOB_BEGIN });
        try {
            const { company, position, jobLocation, jobType, status, editJobId } = state;
            await authFetch.patch(`/jobs/${editJobId}`, {
                company,
                position,
                jobLocation,
                jobType,
                status,
            });
            dispatch({ type: AppActionTypes.EDIT_JOB_SUCCESS });
            clearValues();
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status !== 401) {
                    dispatch({
                        type: AppActionTypes.EDIT_JOB_ERROR,
                        payload: { alertText: err.response?.data.msg },
                    });
                }
            }
        }
    };

    const deleteJob = async (id: string) => {
        dispatch({ type: AppActionTypes.DELETE_JOB_BEGIN });
        try {
            await authFetch.delete(`/jobs/${id}`);
            await getJobs();
        } catch (err) {
            if (err instanceof AxiosError) {
                logoutUser();
            }
        }
    };

    const showStats = async () => {
        dispatch({ type: AppActionTypes.SHOW_STATS_BEGIN });
        try {
            const { data } = await authFetch.get<ResponseStats>('jobs/stats');
            dispatch({
                type: AppActionTypes.SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications,
                },
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                logoutUser();
            }
        }
        clearAlert();
    };

    const clearFilters = () => {
        dispatch({ type: AppActionTypes.CLEAR_FILTERS });
    };

    const changePage = (page: number) => {
        dispatch({ type: AppActionTypes.CHANGE_PAGE, payload: { page } });
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                setupUser,
                toggleSidebar,
                logoutUser,
                updateUser,
                handleChange,
                clearValues,
                createJob,
                getJobs,
                setEditJob,
                deleteJob,
                editJob,
                showStats,
                clearFilters,
                changePage,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
