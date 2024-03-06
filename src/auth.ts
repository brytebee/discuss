import { User } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "@/db";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const AUTH_SECRET = process.env.AUTH_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !AUTH_SECRET) {
  throw new Error("Missing GitHub oauth credenntials!");
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !AUTH_SECRET) {
  throw new Error("Missing Google oauth credenntials!");
}

interface AuthData {
  email: string;
  password: string;
}

const authUser = async (data: AuthData) => {
  const { email, password } = data;
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return null;
  const isvalidPassword = compare(password, user.password || "");
  if (!isvalidPassword) return null;
  return user;
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  adapter: PrismaAdapter(db),
  secret: AUTH_SECRET,
  providers: [
    credentials({
      authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;
        return authUser(credentials as AuthData);
      },
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "janedoe@email.com",
          autoFocus: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
      },
    }),
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // This is usually not needed, here we're fixing a bug in next-auth
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        const { password, ...data } = user;
        token.user = data;
      }
      return token;
    },
    async session({ token, session }: any) {
      if (session && token) {
        session.user = token.user;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Repurpose redirection to fit your needs, remember you have
      // access to both url[where you came from] annd baseurl[root]
      return url;
    },
  },
});
