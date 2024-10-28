import { Lock, UserPlus, Send } from "lucide-react";

// Backend data
export const DB_NAME = "mystry-message",
    EXPIRY_TIME = 600;

// Frontend data
export const navLinks = [
        {
            id: 1,
            name: "Home",
            link: "/"
        },
        {
            id: 2,
            name: "About us",
            link: "/about"
        },
        {
            id: 3,
            name: "Contact us",
            link: "/contact"
        }
    ],
    whyChoose = [
        {
            id: 1,
            title: "Completely Anonymous",
            description:
                "Your identity remains a secret. Express yourself freely without fear of judgment.",
            icon: Lock
        },
        {
            id: 2,
            title: "Easy to Use",
            description:
                "Simple sign-up process and intuitive interface. Start sending messages in minutes.",
            icon: UserPlus
        },
        {
            id: 3,
            title: "Instant Delivery",
            description:
                "Messages are sent and received instantly. No delays in your mysterious conversations.",
            icon: Send
        }
    ];
