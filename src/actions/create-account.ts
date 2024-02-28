"use server";

import { db } from "@/db";
import { z } from "zod";
import { hash } from "bcryptjs";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { encryptCode, generateCode, sendCodeToEmail } from "@/utils";
import { generateTime } from "@/utils";

const CreateAccountSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[A-Za-z ]+$/, {
      message: "Must be letters only",
    }),
  email: z.string().email(),
  password: z.string().min(8),
});

interface RegData {
  errors?: {
    name?: string[];
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
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validate = CreateAccountSchema.safeParse({
    name,
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
        name: validate.data.name,
        email: validate.data.email,
        password: encryptPassword,
      },
    });

    const from = process.env.DOMAIN as string;
    const product = process.env.PRODUCT as string;

    if (!from || !product) {
      return {
        errors: {
          _form: ["Your domain or ProductName is missing!"],
        },
      };
    }

    // Generate random 6 digit code
    const code = generateCode(6);

    // Send email verification code
    const payload = {
      from,
      to: [email],
      subject: "Confirm your account",
      firstName: name.split(" ")[0],
      code,
      product,
    };

    const emailRes: any = await sendCodeToEmail(payload);
    console.log(emailRes);

    // SOMETHING IS WRONG WITH MY EMAIL RESPONSE

    // if (emailRes?.message !== "success") {
    //   await db.user.delete({ where: { email } });
    //   return {
    //     errors: {
    //       _form: ["Account NOT registered! Try again."],
    //     },
    //   };
    // }

    const _in30minsTime = generateTime(30);
    const encryptedToken = encryptCode(email, code);

    // Encode and save the code into your DB
    await db.verificationToken.create({
      data: {
        identifier: email,
        expires: _in30minsTime,
        token: encryptedToken,
      },
    });
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

  redirect("/api/auth/verify-code");
}
