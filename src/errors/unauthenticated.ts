import { StatusCodes } from '../constants/statusCodes';
import CustomAPIError from './custom-api';

class UnAuthenticatedError extends CustomAPIError {
    public statusCode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

export default UnAuthenticatedError;
