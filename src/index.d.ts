import {Express} from "express-serve-static-core"

interface Locals {
    user: {
        userId: string
    }
}

declare module Express {
    export interface Response  {
        locals?: Locals;
    }
}
