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

5.  **Component Refactoring for Integration**:
    *   The entire news feed functionality was refactored into a single, portable React component: `<MarketWatchLive />`. This makes it easy to embed the entire news aggregator into another existing application.

## Prompt to Recreate This App

You can use the following detailed prompt in a new Firebase Studio project to recreate this application. Just copy and paste it as your first instruction.

> Let's build a financial news aggregator called "MarketWatch Live".
>
> **1. Core Functionality: News Feed**
> - Create a service at `src/services/news-fetcher.ts` that uses the `rss-parser` library to fetch news from the Yahoo Finance top stories and videos RSS feeds.
> - The main page should display these articles in a feed.
> - Create a `NewsCard` component at `src/components/news-card.tsx` to display each article's title, source, and time since publication.
>
> **2. AI-Powered Analysis**
> - Integrate Google's Genkit for AI functionality.
> - Create an AI flow at `src/ai/flows/summarize-article.ts` that takes an article URL, fetches its content, and returns a concise summary.
> - Create a second, more complex AI flow at `src/ai/flows/analyze-article.ts`. This flow should take article text as input and:
>     a. Use a tool to identify stock tickers mentioned in the text. For each ticker, call a mock stock price fetcher.
>     b. Extract 3-5 key takeaways.
>     c. Determine the article's main topic.
>     d. Analyze the sentiment (Positive, Negative, or Neutral).
> - On the `NewsCard`, add an "Analyze" button. When clicked, it should first call the summarization flow with the article's URL and then feed the resulting summary into the analysis flow.
> - Display the AI analysis results (summary, tickers, takeaways, topic, and sentiment) in a new `CommentSection` component below the news card. Use icons to represent each piece of information.
> - Add user-friendly toast notifications for any errors during the analysis process.
>
> **3. UI and UX Enhancements**
> - Instead of a generic icon for the publisher, create a utility in `src/lib/publishers.ts` that maps publisher names (like 'Reuters', 'Bloomberg') to their domain. Use the Clearbit API (`https://logo.clearbit.com/DOMAIN`) to dynamically fetch and display the publisher's logo on each `NewsCard`.
> - Add a search bar to the header that filters news articles by title in real-time.
> - Add a "like" button with a `ThumbsUp` icon to each `NewsCard`.
> - Create a user profile page at `/profile` that includes a cover photo, an avatar, and a bio section that the user can edit.
> - Add a subtle, animated "falling stars" particle effect to the background of the entire app for visual appeal.
> - Ensure the entire application uses a dark theme and is styled professionally using ShadCN UI components and Tailwind CSS.
>
> **4. Portability**
> - Finally, refactor the entire news feed UI and logic from the main page into a single, self-contained component called `<MarketWatchLive />` located at `src/components/market-watch-live.tsx`. Make the main page simply render this new component. This will make the news feed easy to embed in other applications.

## Integrating Into Your Main App

After refactoring, the entire news feed is encapsulated in the `<MarketWatchLive />` component. Here’s a basic guide to integrating it into your main application:

1.  **Copy Folders**: Copy the following folders from this project into your main project's `src` folder:
    *   `src/components/`
    *   `src/lib/`
    *   `src/services/`
    *   `src/ai/`
    *   `src/hooks/`
    *   The `src/app/actions.ts` file.

2.  **Merge Dependencies**: Open the `package.json` file from this project. Carefully copy all the dependencies from the `"dependencies"` section into the `package.json` of your main app. Do the same for `"devDependencies"`. Then, run `npm install` (or your package manager's install command) in your main app's directory.

3.  **Merge Tailwind & CSS**:
    *   Copy the `tailwind.config.ts` file. You may need to merge its contents with your existing Tailwind config if you have one.
    *   Open `src/app/globals.css` and copy the CSS variable definitions (the `@layer base` sections) into your main app's global stylesheet.

4.  **Use the Component**: Now, in any page of your main application, you can import and use the news feed like this:

    ```jsx
    import { MarketWatchLive } from '@/components/market-watch-live';

    function YourPage() {
      return (
        <div>
          <h1>My Awesome Dashboard</h1>
          {/* Other content... */}

          <section>
            <h2>Latest Financial News</h2>
            <MarketWatchLive />
          </section>

          {/* Other content... */}
        </div>
      );
    }
    ```

This approach keeps the news feed's code separate and organized within your main application, making it much easier to maintain.


Stage your changes: This command prepares all the modified files to be committed.

git add .

Commit your changes: This saves your staged changes to your local Git history with a descriptive message.

git commit -m "feat: Add IBD news feed and fix ticker analysis"

Push your commit to GitHub: This sends your committed changes from your local machine to your remote repository on GitHub.

git push

After running these commands, your GitHub repository will be up-to-date with all the recent work we've done.