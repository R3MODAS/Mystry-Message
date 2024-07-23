import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/userModel";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        // connect to db
        connectDB();

        try {
          // check if the user with either the username or email exists in the db or not
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier.email },
              { username: credentials.identifier.username },
            ],
          });

          if (!user) {
            throw new Error("User is not found");
          }

          // check if the user is verified or not
          if (!user.isVerified) {
            throw new Error("Please verify your account first");
          }

          // compare the user and db password
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // if the password matches then return the user
          if (isValidPassword) {
            return user;
          }

          // if the password does not matches then throw error
          else {
            throw new Error("Incorrect password");
          }
        } catch (err: unknown) {
          const errMsg = (err as Error).message;
          throw new Error(errMsg);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
