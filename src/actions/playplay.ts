// "use server";

import { sign, verify } from "jsonwebtoken";
import cryptoRandomString from "crypto-random-string";

const SECRET = process.env.AUTH_SECRET as string;

export function generateCode(length: number): string {
  return cryptoRandomString({ length, type: "alphanumeric" });
}

interface EmailData {
  from: string;
  to: string[];
  subject: string;
  firstName: string;
  product: string;
}

export async function sendCodeToEmail(arg: EmailData) {
  // Keep URL in env
  const send = await fetch("http://localhost:3001/v1/confirmation", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  return send;
}

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

export async function playPlay() {}
