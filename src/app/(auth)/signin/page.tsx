"use client";

import { useSession, signIn, signOut } from "next-auth/react";

const Signin = () => {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button
                    onClick={() => signOut()}
                    className="bg-purple-500 text-white"
                >
                    Sign out
                </button>
            </>
        );
    }
    return (
        <>
            <h1>Login page</h1>
            Not signed in <br />
            <button
                onClick={() => signIn()}
                className="bg-purple-500 text-white px-5 py-1"
            >
                Sign in
            </button>
        </>
    );
};

export default Signin;
