export enum AppActionTypes {
    DISPLAY_ALERT = 'SHOW_ALERT',
    CLEAR_ALERT = 'CLEAR_ALERT',
    SETUP_USER_BEGIN = 'SETUP_USER_BEGIN',
    SETUP_USER_SUCCESS = 'SETUP_USER_SUCCESS',
    SETUP_USER_ERROR = 'SETUP_USER_ERROR',
}

export interface AppAction {
    type: AppActionTypes;
    payload?: any;
}
