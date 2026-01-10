import { Types } from "mongoose";
import type { Request, Response, NextFunction } from "express";

export function validateObjectIdParam(param: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.params[param];

    if (!value) {
      next(new Error(`Missing parameter: ${param}`, { cause: 400 }));
      return;
    }

    if (!Types.ObjectId.isValid(value)) {
      next(new Error(`Invalid ${param}`, { cause: 400 }));
      return;
    }

    next();
  };
}