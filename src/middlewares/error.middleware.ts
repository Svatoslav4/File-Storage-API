import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err: unknown,req: Request,res: Response, next: NextFunction) => {
  console.dir(err, { depth: null });

  if (err instanceof Error) {
    return res.status(500).json({success: false,message: err.message,});
  }

  return res.status(500).json({success: false,message: "Unknown error",error: err,});
};
