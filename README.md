# NewsFeed App 📰

A modern, responsive React application that fetches and displays breaking news using the NewsAPI. Built with Vite and Material-UI, this project demonstrates clean architecture, efficient state management, and robust API handling.

## ✨ Features

* **Live News Fetching:** Pulls top headlines from the US using the NewsAPI.
* **Category Filtering:** Browse news by categories such as General, Business, Entertainment, Health, Science, Sports, and Technology.
* **Debounced Search:** Search for specific topics with a highly optimized, debounced search bar (preventing unnecessary API calls).
* **Pagination:** Seamlessly navigate through pages of articles.
* **Elegant UI/UX:** Built with Material-UI (MUI) featuring responsive cards, loading skeletons for better perceived performance, and clean typography.
* **Graceful Error Handling:** Handles network errors, empty states, and safely cancels duplicate network requests using `AbortController`.

## 🛠️ Tech Stack

* **Frontend:** React (Hooks: `useState`, `useEffect`, `useRef`, `useMemo`)
* **Build Tool:** Vite
* **Styling & UI Components:** Material-UI (MUI) v6 & Emotion
* **Utilities:** Lodash (`debounce`)
* **API:** [NewsAPI](https://newsapi.org/)

## 🚀 Getting Started

### Prerequisites
* Node.js installed on your machine.
* A free API key from [NewsAPI.org](https://newsapi.org/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/news-feed.git
    cd news-feed
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory of your project and add your NewsAPI key (do not use quotes or spaces):
    ```env
    VITE_NEWS_API_KEY=your_actual_api_key_here
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

## ⚠️ Important Note on Live Deployment

**NewsAPI Developer Plan Limitation:**
This project uses the free Developer tier of NewsAPI. NewsAPI restricts free-tier requests strictly to `localhost`. If this application is viewed on a live deployed domain (such as GitHub Pages, Vercel, or Netlify), the API requests will be actively blocked by the provider with a `426 Upgrade Required` error. 

To fully experience and test the application's functionality, please clone the repository and run it locally.
