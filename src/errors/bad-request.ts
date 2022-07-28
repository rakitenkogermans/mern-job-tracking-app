import { StatusCodes } from '../constants/statusCodes';
import CustomAPIError from './custom-api';

class BadRequestError extends CustomAPIError {
    public statusCode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequestError;
