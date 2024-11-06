import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import { ErrorHandler } from "@/utils/handlers";
import { NEXTAUTH_SECRET } from "@/config";
import bcrypt from "bcrypt";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            id: "credentials",
            name: "Login your Account",
            credentials: {
                identity: {
                    type: "email",
                    placeholder: "Enter your Email Address"
                },
                password: {
                    type: "password",
                    placeholder: "Enter your Password"
                }
            },
            async authorize(credentials): Promise<any> {
                // Get data from credentials
                const { identity, password } = credentials as {
                    identity: string;
                    password: string;
                };

                // Connection to mongodb
                await connectMongoDB();

                try {
                    // Check if the user exists in the db or not
                    const userExists = await UserModel.findOne({
                        email: identity
                    });
                    if (!userExists) {
                        throw new ErrorHandler("User does not exists", 404);
                    }

                    // Check if the user is verified or not
                    if (!userExists.isVerified) {
                        throw new ErrorHandler("Please verify your email", 401);
                    }

                    // Validation of password
                    const isValidPassword = await bcrypt.compare(
                        password,
                        userExists.password
                    );
                    if (isValidPassword) {
                        // Remove the password and __v
                        userExists.password = undefined!;
                        userExists.__v = undefined!;

                        // Return the user
                        return userExists;
                    } else {
                        throw new ErrorHandler("Invalid Credentials", 403);
                    }
                } catch (err) {
                    if (err instanceof Error) {
                        throw new Error(err.message);
                    }
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username;
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    secret: NEXTAUTH_SECRET
};
