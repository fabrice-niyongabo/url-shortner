import { IUser } from "@/types/user";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "";

export function signToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "15m",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
