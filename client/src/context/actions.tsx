export enum AppActionTypes {
    DISPLAY_ALERT = 'SHOW_ALERT',
    CLEAR_ALERT = 'CLEAR_ALERT',
    REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN',
    REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
    REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
}

export interface AppAction {
    type: AppActionTypes;
    payload?: any;
}
