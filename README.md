# Cinemax

A modern movie discovery web app built with React + TypeScript, powered by [The Movie Database (TMDb) API](https://www.themoviedb.org/).

## Features

- **Home page** — hero backdrop of a featured movie, 12 categorized horizontal carousels: Popular, Trending, Top Rated, Upcoming, and 8 genre-based lists
- **Movie details page** — poster, synopsis, runtime, genres, rating, director/writer credits, YouTube trailer in a modal, full cast, and similar movie suggestions
- **Live search** — debounced search input in the header, navigates to a dedicated results page
- **Responsive design** — works on mobile, tablet, and desktop
- **MobX state management** — centralized stores for movies, search, and movie details

## Tech Stack

| Technology       | Purpose                   |
| ---------------- | ------------------------- |
| React 18         | UI framework              |
| TypeScript       | Type safety               |
| MobX             | State management          |
| MUI (Material UI)| UI components & theming   |
| React Router 6   | Client-side routing       |
| Axios            | HTTP requests to TMDb API |
| Create React App | Build tooling             |

## Pages & Routes

| Route        | Page        | Description                                      |
| ------------ | ----------- | ------------------------------------------------ |
| `/`          | Main Page   | Hero section + 12 movie category carousels       |
| `/movie/:id` | Movie Page  | Full movie details, trailer, cast & similar      |
| `/search?q=` | Search Page | Real-time search results                         |

## Getting Started

### Prerequisites

- Node.js 16+

### Installation

```bash
npm install
```

### Running Locally

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── api.ts              # MovieApi class — all TMDb endpoints
├── theme.ts            # MUI dark theme configuration
├── App.tsx             # Root component, router setup
├── types/              # TypeScript interfaces (Movie, MovieDetail, Cast…)
├── store/              # MobX stores (movieStore, searchStore, movieDetailStore)
├── components/         # Reusable UI components (Header, Poster, MovieCarousel…)
├── pages/              # Route-level components (MainPage, MoviePage, SearchPage)
└── utils/              # Helpers (debounce)
```

## Author

- Telegram: [@meeeeeeerik](https://t.me/meeeeeeerik)
- GitHub: [@meeeeeeerik](https://github.com/meeeeeeerik)
