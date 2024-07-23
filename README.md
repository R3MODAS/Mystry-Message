# Mystery Message App

Welcome to the Mystery Message App! This application allows users to send anonymous messages. Users have control over whether they can receive messages or not, which they can manage from their user dashboard.

## Features

-   **Anonymous Messaging**: Send messages without revealing your identity.
-   **User Dashboard**: Control whether you can receive anonymous messages.
-   **Authentication**: Secure custom signup with verification code and login using NextAuth.
-   **User-Friendly UI**: Clean and modern interface using Shadcn UI and Tailwind CSS.

## Tech Stack

-   **Next.js**: React framework for building server-side rendered applications.
-   **TypeScript**: Typed superset of JavaScript for better code quality and development experience.
-   **Zod**: TypeScript-first schema declaration and validation library.
-   **Shadcn UI**: Customizable component library for React.
-   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
-   **NextAuth**: Authentication for Next.js applications.

## Getting Started

### Prerequisites

-   Node.js (v14.x or later)
-   npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/R3MODAS/Mystry-Message.git
    cd Mystry-Message
    ```

2. Install the dependencies:

    ```bash
    yarn install
    ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

    ```env
    MONGODB_URL=your-mongodb-url
    RESEND_API_KEY=your-resend-api
    NEXTAUTH_SECRET=your-nextauth-secret
    ```

4. Run the development server:

    ```bash
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```bash
/Mystry-Message
├── emails
├── public
├── src
│ ├── app
│ ├── context
│ ├── lib
│ ├── models
│ ├── schemas
│ ├── types
│ ├── utils
│ └── middleware.ts
├── .env.local
├── .env.sample
├── .eslintrc.json
├── .eslintrc.json
├── .prettierignore
├── .prettierrc
├── LICENSE
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```

## Usage

### Authentication

This app uses NextAuth for authentication. Make sure to configure your authentication providers in `src/app/api/auth/[...nextauth]/options.ts`.

### Sending Messages

1. Once logged in, navigate to the message sending page.
2. Enter the recipient's username (if enabled to receive messages) and type your anonymous message.
3. Send the message anonymously.

### Receiving Messages

1. Log in and navigate to your dashboard.
2. Toggle the setting to enable or disable receiving anonymous messages.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License.

---

Feel free to contribute, raise issues, and make suggestions to improve this application. Enjoy messaging anonymously!
