import db from "../db.js";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Unauthorized - No token provided" });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

  if (!decoded) {
    res.status(401).json({ error: "Unauthorized - Invalid Token" });
    return;
  }

  const getUserResult = await db.query("SELECT id FROM users WHERE id = $1", [
    decoded.userId,
  ]);
  const user = getUserResult.rows[0];

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  req.user = user.id;

  next();
};

export const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });

  return token;
};
