Here’s a structured README file for your **Mystry Message** project:

---

# Mystry Message

Mystry Message is a web application that enables users to send and receive anonymous messages. Users can log in, share their unique link to receive anonymous messages, or use someone else’s link to send them an anonymous message. The app keeps all identities hidden for a secure and private experience.

## Demo

You can check out the live application here: [Mystry Message](https://mystry-message-remo.vercel.app)

## Features

-   **Anonymous Messaging**: Users can receive anonymous messages by sharing their link and send messages using others' links, all while keeping identities hidden.
-   **Secure Authentication**: Only logged-in users can send or receive messages.
-   **Real-Time Storage**: Uses MongoDB and Redis to handle data efficiently.
-   **Modern UI**: Built with Tailwind CSS and ShadCN for a sleek and responsive design.

## Built With

-   [Next.js](https://nextjs.org/) - React framework for server-rendered applications.
-   [TypeScript](https://www.typescriptlang.org/) - Type-safe language that builds on JavaScript.
-   [MongoDB](https://www.mongodb.com/) - NoSQL database for storing messages.
-   [Redis](https://redis.io/) - In-memory data structure store for efficient caching.
-   [ShadCN](https://shadcn.dev/) - UI components for modern and stylish design.
-   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

-   Node.js (v14 or above)
-   Yarn
-   MongoDB
-   Redis

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/R3MODAS/mystry-message.git
    cd mystry-message
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Create a `.env.local` file in the root directory and add the following variables:

    ```plaintext
    MONGODB_URI=your_mongodb_uri
    REDIS_URL=your_redis_url
    NEXTAUTH_SECRET=your_nextauth_secret
    ```

4. Run the development server:

    ```bash
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. **Sign up** on Mystry Message.
2. Share your unique link with others to receive anonymous messages.
3. Use someone else’s link to send them an anonymous message.
4. Enjoy anonymous, secure messaging!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---
