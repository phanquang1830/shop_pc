import type { Request, Response, NextFunction } from "express";

// Check role
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    // chưa login, token sai
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    // không dc phép
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
};
