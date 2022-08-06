import { Express } from 'express';

// declare global {
//     namespace Express {
//         interface Request {
//             user?: number;
//         }
//     }
// }

// declare global {
//     namespace Express {
//         interface Response {
//             locals?: { userId: string };
//         }
//     }
// }

interface Locals {
    userId?: string;
}

declare module 'express' {
    export interface Response {
        locals: Locals;
    }
    export interface Request {
        user?: number;
    }
}
