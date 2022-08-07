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

export enum JobTypeEnum {
    FULL_TIME = 'full-time',
    PART_TIME = 'part-time',
    REMOTE = 'remote',
    INTERNSHIP = 'internship',
}

export enum StatusEnum {
    PENDING = 'pending',
    INTERVIEW = 'interview',
    DECLINED = 'declined',
}

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
    jobTypeOptions: typeof JobTypeEnum;
    jobType: JobTypeEnum;
    statusOptions: typeof StatusEnum;
    status: StatusEnum;
    handleChange: (name: string, value: string) => void;
    clearValues: () => void;
    createJob: () => Promise<void>;
    jobs: JobType[];
    totalJobs: number;
    numOfPages: number;
    page: number;
    getJobs: () => Promise<void>;
    setEditJob: (id: string) => void;
    deleteJob: (id: string) => Promise<void>;
    editJob: () => Promise<void>;
    stats: DefaultStats;
    monthlyApplications: [];
    showStats: () => Promise<void>;
};

export type JobType = {
    _id: string;
    company: string;
    position: string;
    status: StatusEnum;
    jobType: JobTypeEnum;
    jobLocation: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type ResponseJob = {
    jobs: JobType[];
    totalJobs: string;
    numOfPages: number | string;
};

export type ResponseStats = {
    defaultStats: DefaultStats;
    monthlyApplications: any[];
};

export type DefaultStats = {
    pending: number;
    interview: number;
    declined: number;
};

export type SetupUserType = { currentUser: CurrentUser; endPoint: string; alertText: string };
