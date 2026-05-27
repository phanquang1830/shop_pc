import jwt from "jsonwebtoken";

import env from "../config/env.js";

type Payload = {
  user_id: number;
  role: string;
};

export const generateAccessToken = (payload: Payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as Payload;
};
