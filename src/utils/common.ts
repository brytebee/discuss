import cryptoRandomString from "crypto-random-string";

export function generateCode(length: number): string {
  return cryptoRandomString({ length, type: "numeric" });
}

const EMAIL_LINK = process.env.EMAIL_ENDPOINT?.toString();

interface EmailData {
  from: string;
  to: string[];
  subject: string;
  firstName: string;
  product: string;
}

export async function sendCodeToEmail(arg: EmailData) {
  if (!EMAIL_LINK) {
    throw new Error("Email sending link unavailable!");
  }
  return await fetch(EMAIL_LINK as string, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(arg),
  });
}
