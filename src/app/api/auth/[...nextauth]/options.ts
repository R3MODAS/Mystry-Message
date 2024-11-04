import { connectMongoDB } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { NEXTAUTH_SECRET } from "@/config";
import { LoginSchema } from "@/schemas/frontend/auth";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            id: "credentials",
            name: "Login to your Account",
            credentials: {
                identity: {
                    label: "Email Address",
                    type: "email",
                    placeholder: "Email Address"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async authorize(credentials): Promise<any> {
                // Connection to mongodb
                await connectMongoDB();

                try {
                    // Validation of data
                    const { identity, password } =
                        LoginSchema.parse(credentials);

                    // Check if the user exists in the db or not
                    const userExists = await UserModel.findOne({
                        email: identity
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
                        password,
                        userExists.password
                    );
                    if (!isValidPassword) {
                        throw new Error("Invalid Credentials");
                    }

                    // Remove the password __v
                    userExists.password = undefined!;
                    userExists.__v = undefined!;

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
    secret: NEXTAUTH_SECRET
};
