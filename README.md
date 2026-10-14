# TrackTripGain

[English](README.md) | [Português](README.pt.md)

An application for recording transport trips and tracking earnings and fuel expenses. The project was built with Expo and React Native and uses Supabase for authentication and data persistence.

## Features

- **Sign up and sign in:** create an account with a name, email, and password, with field validation and authentication through Supabase.
- **Record trips:** enter the customer, date, total distance in kilometers, cargo weight in tons, and rate per kilometer.
- **Calculate net earnings:** the app calculates the gross amount (`kilometers × tons × rate per kilometer`) and subtracts fuel expenses when using your own fuel.
- **View trips:** see trip records with the customer, date, net earnings, gross amount, fuel expenses, rate per kilometer, distance, and weight.
- **Search and filter:** search records by customer name and/or filter them by a selected period.
- **Delete trips:** long-press a record to open the deletion confirmation dialog.
- **View profile:** see the account name, email, trip count, and total earnings.

## Technologies

- [Expo SDK 54](https://docs.expo.dev/)
- React 19 and React Native 0.81
- TypeScript
- Expo Router for navigation
- Supabase Auth and Supabase Database
- NativeWind and Tailwind CSS for styling

## Requirements

- Node.js and npm
- A [Supabase](https://supabase.com/) account and project
- Expo Go to run the app on a physical device, or a configured Android/iOS emulator

## Setup

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone <REPOSITORY_URL>
   cd TrackTripGain
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your Supabase project credentials:

   ```dotenv
   EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
   ```

   The app reads these variables in `config/supabase.ts`. The `.env` file is listed in `.gitignore`; do not publish private credentials to GitHub. Use only a publishable key intended for client applications, and configure Supabase access policies to protect user data.

4. Configure Supabase Auth to allow email and password sign-up and sign-in. The app uses the `trips` table to store and retrieve records. The operations in the code use the following fields: `id`, `user_id`, `user_name`, `customer`, `tripDate`, `totalKm`, `totalTon`, `valuePerKm`, `gain`, `fuel`, and `valueFuel`. The table and its corresponding access policies must be configured in your Supabase project.

## Run the app

Start the development server:

```bash
npm run start
```

You can also start the app for a specific platform:

```bash
npm run android
npm run ios
npm run web
```

The iOS command requires macOS and Apple's development tools for native execution. To use a physical device, open the project in Expo Go and follow the instructions shown by Expo.

## Project structure

```text
app/
  (painel)/       Trip entry, history, and profile screens
  index.tsx       App entry point
  login.tsx       Sign-in screen
  signup.tsx      Account creation screen
components/       Reusable fields, buttons, cards, and controls
config/           Supabase client
contexts/         Authentication and session state
hooks/            Authentication and trip operations
types/            Supporting data types
```

## Current status

The chart component, sample chart data, and hook for retrieving customer names exist in the codebase, but they are not connected to the current screens. Therefore, charts and customer autocomplete are not currently available in the user interface.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run start` | Start Expo |
| `npm run android` | Start Expo for Android |
| `npm run ios` | Start Expo for iOS |
| `npm run web` | Start the web version |
