export enum AppActionTypes {
    DISPLAY_ALERT = 'SHOW_ALERT',
    CLEAR_ALERT = 'CLEAR_ALERT',
}

export interface AppAction {
    type: AppActionTypes;
    // payload?: number;
}
