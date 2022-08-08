import 'express';

interface User {
    userId: string;
}

interface Locals {
    user?: User;
}

declare module 'express' {
    export interface Response {
        locals: Locals;
    }
    export interface Request {}
}
