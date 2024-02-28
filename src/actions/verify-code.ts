"use server";

import { db } from "@/db";
import { z } from "zod";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { decryptCode, generateTime } from "@/utils";

const VerifyCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6),
});

interface RegData {
  errors?: {
    email?: string[];
    code?: string[];
    _form?: string[];
  };
  data?: {
    message: string[];
  };
}

export async function verifyCode(
  formState: RegData,
  formData: FormData
): Promise<RegData> {
  const email = formData.get("email") as string;
  const code = formData.get("code") as string;

  const validate = VerifyCodeSchema.safeParse({
    email,
    code,
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
    };
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (!existing)
    return {
      errors: { _form: ["User doesn't exist!"] },
    };

  // get the user code from DB
  const dbCode = await db.verificationToken.findUnique({
    where: { identifier: email },
  });
  if (!dbCode) {
    return {
      errors: {
        _form: ["Code not found!"],
      },
    };
  }
  // pass the code to decrypt function
  const dcryptedCode = await decryptCode(dbCode.token);

  // @ts-ignore
  if (code !== dcryptedCode?.code) {
    return {
      errors: {
        _form: ["Incorrect code!"],
      },
    };
  }

  const rightNow = generateTime(0);

  let user: User;
  try {
    user = await db.user.update({
      where: { email },
      data: {
        emailVerified: rightNow,
        active: true,
      },
    });

    // Generate random 6 digit code
    // Send email verification code
    // Encode and save the code into your DB
    // Trap the response and verify it against the code in the DB.
    //   // Decode the code saved to the DB
    //   // Compare the code
    // Set email verify key to true
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    }
    return {
      errors: {
        _form: ["Something went wrong."],
      },
    };
  }
  redirect("/api/auth/signin");
}
