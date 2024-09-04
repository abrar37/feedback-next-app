# Feedback Next.js App
This project is a feedback web application built with Next.js, Tailwind CSS, Mongoose for MongoDB, and Shadcn for UI components. The app provides user registration, username validation, and feedback submission functionalities. It is deployed on Vercel.


## Features

- `User Registration`: Allows users to create accounts and register with unique usernames.
- `Username Validation`: Validates usernames using a debounced API call to ensure uniqueness.
- `Feedback Submission`: Enables registered users to submit anonymous feedback.
- `User Dashboard`: Allows registered users to see the anonymous messages.

## Technologies Used
> Next.js: A React framework for building server-side rendered and statically generated web applications.

> React: A JavaScript library for building user interfaces.

> Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.

> Zod: A TypeScript-first schema declaration and validation library.

> React Hook Form: A performant, flexible, and extensible form library for React.

> Axios: A promise-based HTTP client for the browser and Node.js.

> bcryptjs: A library to hash passwords.

> NextAuth.js: Authentication for Next.js applications.

> Shadcn: A collection of UI components built with Radix UI and Tailwind CSS.

> Tailwind CSS: A utility-first CSS framework for creating custom designs.


## Folder Structure
```java
├── emails/template
├── public/
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── verify/
│   │   ├── api/
│   │   │   ├── accept-messages/
│   │   │   ├── auth/[...nextauth]
│   │   │   ├── check-username/
│   │   │   ├── delete-message/
│   │   │   ├── get-messages/
│   │   │   ├── send-message/
│   │   │   ├── sign-up/
│   │   │   └── verify-code/
│   │   ├── u/[username]
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Footer.tsx
│   │   │   ├── MessageCard.tsx
│   │   │   └── Navbar.tsx
│   │   └── context/
│   │       └── AuthProvider.tsx
│   ├── data/
│   ├── helpers/
│   │   └── emailVerificationEmail.ts
│   ├── lib/
│   │   ├── dbConnect.ts
│   │   ├── resend.ts
│   │   └── utils.ts
│   ├── model/
│   │   └── User.ts
│   ├── schemas/
│   ├── types/
│   │   ├── ApiResponse.ts
│   │   ├── middleware.ts
│   │   └── next-auth.d.ts
├── middleware.ts
├── .env
```

## API Routes

Checks if a username is unique.
- GET /api/check-username

Registers a new user.
- POST /api/sign-up

Sign in user.
- POST /api/sign-in

Retrieves a list of messages.
- GET /api/get-messages

Sends a new message.
- POST /api/send-message

Deletes a message.
- POST /api/delete-message

Accepts incoming messages status.
- POST /api/accept-messages

Verifies a code sent to the user (e.g., for email verification).
- POST /api/verify-code

## Deployment

The app is deployed on Vercel. Follow these steps to deploy:

- Push your code to GitHub, GitLab, or Bitbucket.
- Connect your repository to Vercel.
- Set up environment variables in Vercel.
- Deploy the app.

Check out App here [Live App ](feedback-next-app.vercel.app)

## Inspired By 
https://github.com/hiteshchoudhary/ama-app
