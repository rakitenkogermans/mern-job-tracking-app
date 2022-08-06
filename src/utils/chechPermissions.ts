import { UnAuthenticatedError } from '../errors';
import { Types } from 'mongoose';
const chechPermissions = (requestUser: string, resourceUserId: Types.ObjectId) => {
    if (requestUser === resourceUserId.toString()) return;
    throw new UnAuthenticatedError('Not authorized to acces this route!');
};

export { chechPermissions };
