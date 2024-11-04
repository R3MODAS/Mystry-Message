import "next-auth";

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        username?: string;
        email?: string;
        isVerified?: string;
        isAcceptingMessages?: boolean;
    }
}

declare module "next-auth" {
    interface User {
        _id?: string;
        username?: string;
        email?: string;
        isVerified?: string;
        isAcceptingMessages?: boolean;
    }

    interface Session {
        user: {
            _id?: string;
            username?: string;
            email?: string;
            isVerified?: string;
            isAcceptingMessages?: boolean;
        } & DefaultSession["user"];
    }
}
