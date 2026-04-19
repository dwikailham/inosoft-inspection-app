# Inosoft Inspection App

👉 **Live Demo:** [https://inosoft-inspection-app.vercel.app/](https://inosoft-inspection-app.vercel.app/)

A modern, responsive web application built with [Next.js](https://nextjs.org) for managing, tracking, and reviewing technical inspection requests. The application provides a comprehensive dashboard to track inspections across their lifecycle, alongside detailed granular views for scope of work and item-level inspections.

## Features

- 📊 **Inspection Dashboard**: Tab-based overview (Open, For Review, Completed) with search capabilities to track request progress.
- 📋 **Inspection Creation**: Robust creation form with cascading logic, item lot assignments, and integrated client-side validation.
- 🔍 **Detailed Breakdown**: Granular view of each inspection, showing Request Information, Scope of Work details, and comprehensive Item/Lots progress including dynamic metrics (PCS/MT tracking).
- 🕒 **Standardized Formatting**: Consistent date formatting powered by `dayjs`.
- 🎨 **Modern UI Aesthetic**: Built cleanly with Tailwind CSS, ensuring accessibility and a professional layout.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React 18+](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (for robust global state tracking)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [Day.js](https://day.js.org/)

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) installed on your system.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/dwikailham/inosoft-inspection-app.git
   cd inosoft-inspection-app
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

Start the local development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. The App Router automatically updates the UI dynamically as you edit the source files.

*(Note: During development mode `npm run dev`, you may notice API fetching hitting two times initially for each load. This is fully intentional from React 18's Strict Mode doing a Mount-Unmount-Mount lifecycle test to prevent side-effects, and it will resolve itself flawlessly to 1 API hit during production).*

## Project Structure

- `src/app/`: Next.js App Router core, containing your distinct page routes (`/`, `/[id]`, `/create`).
- `src/components/`: Reusable React components organized systematically (e.g. `atoms`, `molecules`, `organisms`).
- `src/types/`: Centralized TypeScript interfaces outlining complex API payload contracts (e.g. `InspectionData`, `InspectionWork`).
- `src/utils/`: Custom unified utility functions (such as the standard `formatDate` helper logic).
- `src/store/`: Global Redux Toolkit architecture covering standard client dropdowns and configuration store.
- `src/lib/`: External backend-placeholder files and static mock data sources.

## Building for Production

Compile optimized production build locally:

```bash
npm run build
npm start
```

## Deployment

This application is deployed and hosted on **[Vercel](https://vercel.com/)** for seamless global delivery and native Next.js performance optimizations.
