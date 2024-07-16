import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        // connect to db
        connectDB();

        try {
          // check if the user exists in the db or not
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("No user is found with this email");
          }

          // check if the user is verified or not
          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }

          // check if the user password and db password matches or not
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isValidPassword) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err: unknown) {
          throw new Error((err as Error).message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // check if the token exists or not
      if (token) {
        session.user._id = token._id?.toString();
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      // check if the user exists or not
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
