import { User } from "@prisma/client";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

type UserExludePassword = Omit<User, "password">;
declare module "next-auth" {
  interface Session {
    user: UserExludePassword;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserExludePassword;
  }
}
