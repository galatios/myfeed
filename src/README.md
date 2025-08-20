# MarketWatch Live

This is a Next.js application built in Firebase Studio that serves as a dynamic financial news feed aggregator. It leverages AI to provide in-depth analysis of news articles.

## How This App Was Built

This application was developed iteratively through a conversation-driven process in Firebase Studio. Here is a summary of the key steps taken to build it:

1.  **Initial Setup**: The application began as a standard Next.js starter project with TypeScript, Tailwind CSS, and ShadCN UI components.

2.  **Core News Feed**:
    *   An RSS parser was implemented in `src/services/news-fetcher.ts` to fetch top stories and videos from the Yahoo Finance RSS feed.
    *   A `NewsCard` component (`src/components/news-card.tsx`) was created to display each article, including its title, image, and source.
    *   A `NewsSidebar` (`src/components/news-sidebar.tsx`) was added to show a list of trending articles.

3.  **AI-Powered Article Analysis**:
    *   Google's Genkit was integrated to add generative AI capabilities (`src/ai/genkit.ts`).
    *   An AI flow was created (`src/ai/flows/analyze-article.ts`) to analyze article content. This flow identifies mentioned stock tickers (using a tool to fetch mock prices), extracts key takeaways, determines the overall topic, and analyzes the sentiment (Positive, Negative, or Neutral).
    *   A second AI flow (`src/ai/flows/summarize-article.ts`) was implemented to reliably fetch and summarize content from a given URL.
    *   These flows were connected in `src/app/actions.ts`, creating a two-step analysis process: first summarize the article from its link, then analyze the summary. This robust approach handles various article formats and prevents errors.
    *   An "Analyze" button was added to each `NewsCard`, which triggers the AI analysis and displays the results in a dedicated `CommentSection` component.

4.  **User Interface and Experience (UI/UX) Enhancements**:
    *   **Publisher Logos**: The app was enhanced to dynamically display the logo of the original publisher (e.g., Reuters, Bloomberg) instead of a generic icon. This was achieved by parsing the publisher's domain from the article link and using the Clearbit API to fetch the corresponding logo.
    *   **Error Handling**: Toast notifications were added to provide clear, user-friendly feedback when AI analysis fails, improving the user experience.
    *   **Dynamic Background**: A subtle "falling stars" animation was added to the background for visual appeal.
    *   **Profile Page**: A user profile page was created at `/profile` with a cover photo, avatar, and an editable bio section.
    *   **Search and Interactivity**: A search bar was implemented in the header to filter the news feed, and a "like" button was added to each news card.

This combination of a real-time news feed and powerful AI analysis creates a rich, interactive experience for users interested in financial markets.

## Migrating to a New Project

To "wire up" this application in a different or new Next.js project, you'll need to move all the essential code and configurations. Here’s a step-by-step guide:

### 1. Set Up Your New Project

If you're starting from scratch, create a new Next.js application. You can use the following command:

```bash
npx create-next-app@latest my-new-app --typescript --tailwind --eslint
```

### 2. Copy Source Code Directories

Copy the entire `src` directory from this project into your new project's root folder. This contains all the essential application logic:
- `src/app`: All pages, layouts, and routes.
- `src/components`: All reusable React components.
- `src/lib`: Utility functions, type definitions, and publisher logic.
- `src/ai`: All Genkit flows and AI-related code.
- `src/services`: Data-fetching services (news and stocks).
- `src/hooks`: Custom React hooks.

### 3. Merge `package.json`

Open the `package.json` file from this project and the one in your new project. You need to copy all the packages from the `dependencies` and `devDependencies` sections into your new project's `package.json`. Make sure not to overwrite any essential scripts from your new project.

### 4. Copy Configuration Files

Copy the following configuration files from this project's root directory to your new project's root directory. These files define how your app is styled, built, and configured.

- `tailwind.config.ts`
- `next.config.ts`
- `tsconfig.json`
- `components.json`
- `apphosting.yaml` (if you plan to use Firebase App Hosting)

### 5. Set Up Environment Variables

Create a file named `.env.local` in the root of your new project. Open the `.env` file from this project and copy its contents into your new `.env.local` file. You will need to provide your own API keys for any services that require them (like the Gemini API).

Example `.env.local` content:
```
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

### 6. Install Packages and Run

Once all the files are in place, navigate to your new project's directory in your terminal and install all the required packages by running:

```bash
npm install
```

After the installation is complete, you can start the development server:

```bash
npm run dev
```

Your application should now be running locally, fully wired up and ready to go!
