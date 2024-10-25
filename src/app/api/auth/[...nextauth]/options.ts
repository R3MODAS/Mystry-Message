import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { UserModel } from "@/models/user";
import { connectMongoDB } from "@/utils/mongodb";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async authorize(credentials): Promise<any> {
                // Validation of data
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                // Connection to mongodb
                await connectMongoDB();

                try {
                    // Check if the user exists in the db or not
                    const userExists = await UserModel.findOne({
                        email: credentials.email
                    });
                    if (!userExists) {
                        throw new Error("User does not exists");
                    }

                    // Check if the user is verified or not
                    if (!userExists.isVerified) {
                        throw new Error("User is not verified");
                    }

                    // Validation of password
                    const isValidPassword = await compare(
                        credentials.password,
                        userExists.password
                    );
                    if (!isValidPassword) {
                        throw new Error("Invalid Credentials");
                    }

                    // Remove the password and __v
                    userExists.__v = undefined!;
                    userExists.password = undefined!;

                    // Return the user
                    return userExists;
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
    secret: process.env.NEXTAUTH_SECRET
};
