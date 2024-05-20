import jwt from "jsonwebtoken";
import fs from "fs";

const privateKey = fs
  .readFileSync("src/private.pem", "utf8")
  .replace(/\\n/g, "\n");

const publicKey = fs
  .readFileSync("src/private.pem", "utf8")
  .replace(/\\n/g, "\n");

export function signJwt(payload: Object) {
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
}

export function verifyJwt(token: string) {
  try {
    const payload = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });
    return {
      decoded: true,
      payload,
    }
  } catch (e: any) {
    return {
      decoded: false,
      payload: e.message,
    }
  }
}
