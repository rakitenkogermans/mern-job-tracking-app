export type UserId = {
    _id: string;
};
export type ResponseUser = {
    user: User & UserId;
    token: string;
    location: string;
};

export type CurrentUser = {
    name?: string;
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
    setupUser: ({ currentUser, endPoint, alertText }: SetupUserType) => Promise<void>;
    user: User | null;
    token: string | null;
    userLocation: string;

    showSidebar: boolean;
    toggleSidebar: () => void;
    logoutUser: () => void;
    updateUser: (currentUser: User) => Promise<void>;

    isEditing: boolean;
    editJobId: string;
    position: string;
    company: string;
    jobLocation: string;
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'];
    jobType: 'full-time' | 'part-time' | 'remote' | 'internship';
    statusOptions: ['pending', 'interview', 'declined'];
    status: 'pending' | 'interview' | 'declined';
    handleChange: (name: string, value: string) => void;
    clearValues: () => void;
    createJob: () => Promise<void>;
};

export type SetupUserType = { currentUser: CurrentUser; endPoint: string; alertText: string };
