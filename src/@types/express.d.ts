import "express";

// khai báo thêm field user cho Express Request
// để TypeScript hiểu req.user
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      user_id: number;
      role: string;
    };
  }
}
