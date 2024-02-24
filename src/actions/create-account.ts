"use server";

import { db } from "@/db";
import { z } from "zod";
import { hash } from "bcryptjs";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

const CreateAccountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface RegData {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  data?: {
    message: string[];
  };
}

export async function createAccount(
  formState: RegData,
  formData: FormData
): Promise<RegData> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // console.log(email, password);

  const validate = CreateAccountSchema.safeParse({
    email,
    password,
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
    };
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing)
    return {
      errors: { _form: ["User already exists!"] },
    };

  const encryptPassword = await hash(validate.data.password, 10);

  let user: User;
  try {
    user = await db.user.create({
      data: {
        email: validate.data.email,
        password: encryptPassword,
      },
    });
    // Generate random 6 digit code
    // Send email verification code
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
