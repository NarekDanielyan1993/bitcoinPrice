import 'express';

declare module 'express' {
    interface Request {
        data?: any;
    }
}
