# LMS-Frontend
Frontend of our Next-Gen Learning Management System is built with NextJs and Redux for state management.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Install dependencies

```
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Clerk Auth Setup
Add clerk client and secret to .env file like so 
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_1234
CLERK_SECRET_KEY=sk_test_1234
```
