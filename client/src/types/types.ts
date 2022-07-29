export interface ResponseUser {
    user: User;
    token: string;
    location: string;
}

export type CurrentUser = {
    name: string;
    email: string;
    password: string;
};

export type User = {
    email: string;
    lastName: string;
    location: string;
    name: string;
};

export type StateType = {
    isLoading: boolean;
    showAlert: boolean;
    alertText: string;
    alertType: 'danger' | 'success' | null;
    displayAlert: () => void;
    registerUser: (currentUser: CurrentUser) => Promise<void>;
    user: User | null;
    token: string | null;
    userLocation: string;
    jobLocation: string;
};