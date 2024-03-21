# Nextjs fullstack shop

Production: [Nextjs Shop](https://nextjs-shop-ochre-eight.vercel.app/)

# Development

## Running

Note:

- We use npm for package manager and NVM for node version manager
  Run in local:
- `$ nvm use`
- `$ npm i`
- `$ npm run dev`

## Prisma

- `$ npx prisma db push`

## Test account

Admin: admin@gmail.com/123

## Turn on stripe in local for auto checkout:

- `$ stripe login`
- update secret `STRIPE_WEBHOOK_SECRET` if needed
- `$ stripe listen --forward-to localhost:3000/api/stripe-webhook`
