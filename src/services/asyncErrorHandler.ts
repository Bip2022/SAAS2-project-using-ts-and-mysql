
import { NextFunction, Request, Response } from 'express';

export class AsyncHandler {
  static ErrorHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch((error: Error) => {
        return res.status(500).json({
          success: false,
          message: error.message,
          fullError: error,
        });
      });
    };
  }
}

export default AsyncHandler;
