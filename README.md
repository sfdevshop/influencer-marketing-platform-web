# Welcome to Influencity!

The frontend uses Remix, to get up to speed with Remix, please check out the following resources:

- [Remix Docs](https://remix.run/docs)

## Project Structure

Under the `routes` folder you will find files that correspond to the
routes of the application. For example, the `routes/_index.tsx` file
corresponds to the `/` route. The `routes/dashboard.tsx` file
corresponds to the `/dashboard` route.

The exception is the `routes/api.tsx` file, which is a special route for
handling API requests.

A good way to familiarize yourself with the project is to start at the
`types/ApiOps.ts` file. This file contains the types for the API
operations that are used throughout the application as well as the data
models that are used in the application.

Key operations interacting with the database can be found in the
`utils/db.ts` file.

All the api endpoints are defined in the `constants/api.tsx` file.

The `components` folder contains all the React components used in the
application.

## UI Framework

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling
and [DaisyUI](https://daisyui.com/) for component styling/theming.

## Get Started

Please run the following commands to get started:

```sh
npm install
```

## Development

The following command will run two processes during development when using Architect as your server.

- Your Architect server sandbox
- The Remix development server

```sh
npm run dev
```

Your file changes are watched, and assets are rebuilt upon change.

Open up [http://localhost:3333](http://localhost:3333) and you should be ready to go!

## Deploying

Before you can deploy, you'll need to do some setup with AWS:

- First [install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- Then [follow the Architect setup instructions](https://arc.codes/docs/en/guides/get-started/detailed-aws-setup).

If you make it through all of that, you're ready to deploy!

1. build the app for production:

   ```sh
   npm run build
   ```

2. Deploy with `arc`

   ```sh
   npx arc deploy production
   ```

You're in business!
