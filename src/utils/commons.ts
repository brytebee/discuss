import cryptoRandomString from "crypto-random-string";

const EMAIL_LINK = process.env.EMAIL_ENDPOINT?.toString();

// Generate code
export function generateCode(length: number): string {
  return cryptoRandomString({ length, type: "numeric" });
}

interface EmailData {
  from: string;
  to: string[];
  subject: string;
  firstName: string;
  product: string;
}

// Send emails for confirmations
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

// Generate ISO standard time
export function generateTime(mins: number) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + mins * 60000);
  return expiresAt.toISOString();
}
