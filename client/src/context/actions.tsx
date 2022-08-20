import { ResponseJob, ResponseStats, ResponseUser } from '../types/types';

export enum AppActionTypes {
    DISPLAY_ALERT = 'SHOW_ALERT',
    CLEAR_ALERT = 'CLEAR_ALERT',
    SETUP_USER_BEGIN = 'SETUP_USER_BEGIN',
    SETUP_USER_SUCCESS = 'SETUP_USER_SUCCESS',
    SETUP_USER_ERROR = 'SETUP_USER_ERROR',
    UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN',
    UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
    UPDATE_USER_ERROR = 'UPDATE_USER_ERROR',
    TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
    LOGOUT_USER = 'LOGOUT_USER',
    HANDLE_CHANGE = 'HANDLE_CHANGE',
    CLEAR_VALUES = 'CLEAR_VALUES',
    CREATE_JOB_BEGIN = 'CREATE_JOB_BEGIN',
    CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS',
    CREATE_JOB_ERROR = 'CREATE_JOB_ERROR',
    GET_JOB_BEGIN = 'GET_JOB_BEGIN',
    GET_JOB_SUCCESS = 'GET_JOB_SUCCESS',
    SET_EDIT_JOB = 'SET_EDIT_JOB',
    DELETE_JOB_BEGIN = 'DELETE_JOB_BEGIN',
    EDIT_JOB_BEGIN = 'EDIT_JOB_BEGIN',
    EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS',
    EDIT_JOB_ERROR = 'EDIT_JOB_ERROR',
    SHOW_STATS_BEGIN = 'SHOW_STATS_BEGIN',
    SHOW_STATS_SUCCESS = 'SHOW_STATS_SUCCESS',
    CLEAR_FILTERS = 'CLEAR_FILTERS',
    CHANGE_PAGE = 'CHANGE_PAGE',
}

type AlertPayload = {
    alertText: string;
};

export type AppAction =
    | { type: AppActionTypes.DISPLAY_ALERT }
    | { type: AppActionTypes.CLEAR_ALERT }
    | { type: AppActionTypes.SETUP_USER_BEGIN }
    | { type: AppActionTypes.SETUP_USER_SUCCESS; payload: AlertPayload & ResponseUser }
    | { type: AppActionTypes.SETUP_USER_ERROR; payload: AlertPayload }
    | { type: AppActionTypes.TOGGLE_SIDEBAR }
    | { type: AppActionTypes.LOGOUT_USER }
    | { type: AppActionTypes.UPDATE_USER_BEGIN }
    | { type: AppActionTypes.UPDATE_USER_SUCCESS; payload: ResponseUser }
    | { type: AppActionTypes.UPDATE_USER_ERROR; payload: AlertPayload }
    | { type: AppActionTypes.HANDLE_CHANGE; payload: { name: string; value: string } }
    | { type: AppActionTypes.CLEAR_VALUES }
    | { type: AppActionTypes.CREATE_JOB_BEGIN }
    | { type: AppActionTypes.CREATE_JOB_SUCCESS }
    | { type: AppActionTypes.CREATE_JOB_ERROR; payload: AlertPayload }
    | { type: AppActionTypes.GET_JOB_BEGIN }
    | { type: AppActionTypes.GET_JOB_SUCCESS; payload: ResponseJob }
    | { type: AppActionTypes.SET_EDIT_JOB; payload: { id: string } }
    | { type: AppActionTypes.EDIT_JOB_BEGIN }
    | { type: AppActionTypes.EDIT_JOB_SUCCESS }
    | { type: AppActionTypes.EDIT_JOB_ERROR; payload: AlertPayload }
    | { type: AppActionTypes.DELETE_JOB_BEGIN }
    | { type: AppActionTypes.SHOW_STATS_BEGIN }
    | {
          type: AppActionTypes.SHOW_STATS_SUCCESS;
          payload: {
              stats: ResponseStats['defaultStats'];
              monthlyApplications: ResponseStats['monthlyApplications'];
          };
      }
    | { type: AppActionTypes.CLEAR_FILTERS }
    | { type: AppActionTypes.CHANGE_PAGE; payload: { page: number } };
