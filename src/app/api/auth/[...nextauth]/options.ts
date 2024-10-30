import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import { NEXTAUTH_SECRET } from "@/config";
import { UserModel } from "@/models/user";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
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
                // Validation of data
                if (!credentials?.identity || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                // Connection to mongodb
                await connectMongoDB();

                // Check if the user exists in the db or not
                const userExists = await UserModel.findOne({
                    email: credentials?.identity
                });
                if (!userExists) {
                    throw new Error("User does not exists");
                }

                // Check if the user is verified or not
                if (!userExists.isVerified) {
                    throw new Error("User is not verified");
                }

                // Validation of password
                const isValidPassword = await bcrypt.compare(
                    credentials?.password,
                    userExists.password
                );
                if (!isValidPassword) {
                    throw new Error("Invalid credentials");
                }

                // Remove the password
                userExists.password = undefined!;
                userExists.__v = undefined!;

                // Return the user
                return userExists;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.username = user.username;
                token.email = user.email;
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.email = token.email;
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
