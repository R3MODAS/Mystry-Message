import { Mail, Lock, UserPlus, Send } from "lucide-react";
import Link from "next/link";

const AboutusPage = () => {
    return (
        <div className="py-16 bg-color-1 text-color-4">
            <main className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-color-2 to-color-3 text-transparent bg-clip-text py-2">
                    About Mystry Message
                </h2>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Our Story
                    </h2>
                    <p className="mb-4">
                        Mystry Message was born from a simple idea to create a
                        space where people could express themselves freely,
                        without the constraints of identity. In a world where
                        every word is tied to a face, we wanted to offer a
                        canvas for pure thoughts and emotions.
                    </p>
                    <p>
                        Founded in 2024, our platform has grown from a small
                        project into a global community of mystery enthusiasts,
                        each contributing to a tapestry of anonymous
                        conversations that span cultures, backgrounds, and
                        experiences.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Our Mission
                    </h2>
                    <p>
                        At Mystry Message, we believe in the power of anonymous
                        communication to foster genuine connections, spark
                        creativity, and provide a safe space for
                        self-expression. Our mission is to maintain a platform
                        where ideas can flow freely, unencumbered by
                        preconceptions or judgments based on identity.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        What Sets Us Apart
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-color-7 p-6 rounded-lg">
                            <Lock className="h-12 w-12 text-color-2 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Uncompromising Privacy
                            </h3>
                            <p>
                                Your identity is sacred. Our advanced encryption
                                ensures your anonymity is never compromised.
                            </p>
                        </div>
                        <div className="bg-color-7 p-6 rounded-lg">
                            <UserPlus className="h-12 w-12 text-color-2 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Community-Driven
                            </h3>
                            <p>
                                Our users shape the Mystry Message experience.
                                We&apos;re constantly evolving based on community
                                feedback.
                            </p>
                        </div>
                        <div className="bg-color-7 p-6 rounded-lg">
                            <Send className="h-12 w-12 text-color-2 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Instant Connections
                            </h3>
                            <p>
                                From thought to post in seconds. Our platform is
                                designed for spontaneous, real-time
                                interactions.
                            </p>
                        </div>
                        <div className="bg-color-7 p-6 rounded-lg">
                            <Mail className="h-12 w-12 text-color-2 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Diverse Conversations
                            </h3>
                            <p>
                                Engage in discussions on any topic. Our
                                community spans interests, cultures, and
                                perspectives.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                        Join the Mystery
                    </h2>
                    <p className="mb-8">
                        Ready to experience the freedom of anonymous messaging?
                        Join our growing community today!
                    </p>
                    <Link
                        href="/signup"
                        className="bg-gradient-to-r from-color-2 to-color-3 hover:from-color-5 hover:to-color-6 text-white px-7 py-3.5 rounded-full text-base h-11"
                    >
                        Sign Up Now
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default AboutusPage;
