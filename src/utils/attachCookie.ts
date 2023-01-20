import { Response } from 'express';

const attachCookie = ({ res, token, name }: { res: Response; token: string; name: string }) => {
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie(name, token, {
        httpOnly: true,
        expires: new Date(new Date(Date.now() + oneDay * 7).setUTCHours(0, 0, 0, 0)),
        secure: process.env.NODE_ENV === 'production',
    });
};

export { attachCookie };
