# Movie Explorer – Discover Your Favorite Films

## Introduction

This project is the "Movie Explorer" web application, created as an intern assignment at LoonsLab. This application allows users to search for movies, view their details, and discover trending films. Real-time movie data is fetched from the TMDb (The Movie Database) API and displayed here.

## Features

This application includes the following features:

1.  **User Interface (UI):**
    * User login interface with username and password.
    * A search bar where users can type a movie name to get relevant results.
    * Display a grid of movie posters, each showing the title, release year, and rating.
    * Clicking on a movie opens a detailed view with additional information (overview, genre, cast, trailer link, etc.).
    * A trending movies section displaying popular movies from the API.
    * Implement a light/dark mode for better user experience.

2.  **API Integration:**
    * The Movie Database (TMDb) API (https://developers.themoviedb.org/3) has been used to fetch the following data:
        * Trending movies
        * Movie search results
        * Movie details (title, poster, description, rating, genres, etc.)
    * Infinite scrolling is implemented for search results.
    * API errors are handled gracefully with user-friendly messages.

3.  **State Management:**
    * React Context API or Redux has been used to manage movie data.
    * The user's last searched movie is stored in local storage for persistence.
    * Users can save favorite movies to a list stored locally.

4.  **Extra Features (Bonus):**
    * Users can filter movies by genre, year, or rating.
    * YouTube trailers are shown using the YouTube API or an embed link from TMDb.
    * A "Load More" button is implemented instead of infinite scroll for better UX.

## Technical Guidelines & Instructions

1.  **Setup & Environment:**
    * A new React app has been created using Create React App.
    * axios has been used for API requests.
    * Material-UI (MUI) has been installed and used for styling.

2.  **Development Process:**
    * The UI is broken down into reusable components (e.g., MovieCard, SearchBar, MovieDetails).
    * React Router has been used for navigation (Home, Movie Details, Favorites).
    * Mobile-first responsive design principles have been followed.

3.  **Testing & Deployment:**
    * The app has been deployed using Vercel or Netlify, and a live demo link is provided.

## Deliverables

* GitLab Repository with well-structured, commented code.
* README.md explaining project setup, API usage, and features implemented.
* Deployed live link for the working app.

## Installation

1.  Clone the GitLab repository:
    ```bash
    git clone https://github.com/Kavishka-Prabashara/Movie-Explorer-App.git
    ```

2.  Navigate to the project directory:
    ```bash
    cd movie-explorer_app
    ```

3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

4.  Get a TMDb API key from (https://developers.themoviedb.org/3).

5.  Create a `.env.local` file in the project's root directory and include your API key as follows:
    ```
    REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY
    ```

## Running the App

1.  Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```

2.  The app will open in your browser at `http://localhost:`

## Deployed Link

https://movie-explorer-app-gd5r-7dn17xunw-kavishka-prabasharas-projects.vercel.app/

## Author

Kavishka Prabashara

kavishkaprabshara@gmail.com

https://github.com/Kavishka-Prabashara/Movie-Explorer-App.git
