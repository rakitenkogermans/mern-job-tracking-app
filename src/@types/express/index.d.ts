import { Express } from 'express';

// declare global {
//     namespace Express {
//         interface Request {
//             user?: number;
//         }
//     }
// }

interface User {
    userId: string;
}

interface Locals {
    user?: User;
}

// declare global {
//     namespace Express {
//         interface Response {
//             locals: User;
//         }
//     }
// }

declare module 'express-serve-static-core' {
    export interface Response {
        locals: Locals;
    }
    export interface Request {}
}
