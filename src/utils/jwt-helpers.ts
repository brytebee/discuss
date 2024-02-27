import { sign, verify } from "jsonwebtoken";

const SECRET = process.env.AUTH_SECRET as string;

export async function encryptCode(email: string, code: string) {
  const token = sign({ email, code }, SECRET, {
    expiresIn: "10m",
    algorithm: "HS256",
  });
  console.log(token);
  return token;
}

export async function decryptCode(token: any) {
  try {
    const decoded = verify(token, SECRET, { algorithms: ["HS256"] });
    console.log("Decoded payload:", decoded);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return error;
  }
}
