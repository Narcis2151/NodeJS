import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function signJwt(payload: Object) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined.");
  }
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: "1h",
  });
  return token;
}

export function verifyJwt(token: string) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined.");
    }
    const payload = jwt.verify(token, jwtSecret);
    return {
      decoded: true,
      payload,
    };
  } catch (e: any) {
    return {
      decoded: false,
      payload: e.message,
    };
  }
}
