import { makeAutoObservable, runInAction } from 'mobx';
import MovieApi from '../api';
import { Movie } from '../types';

export class MovieStore {
  popular: Movie[] = [];
  trending: Movie[] = [];
  topRated: Movie[] = [];
  upcoming: Movie[] = [];
  adventure: Movie[] = [];
  action: Movie[] = [];
  animation: Movie[] = [];
  comedy: Movie[] = [];
  horror: Movie[] = [];
  thriller: Movie[] = [];
  fantasy: Movie[] = [];
  history: Movie[] = [];
  backdropMovie: Movie | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAll() {
    if (this.popular.length > 0) return;
    this.isLoading = true;
    this.error = null;
    try {
      const [
        popular,
        trending,
        topRated,
        upcoming,
        adventure,
        action,
        animation,
        comedy,
        horror,
        thriller,
        fantasy,
        history,
      ] = await Promise.all([
        MovieApi.getPopular(),
        MovieApi.getTrending(),
        MovieApi.getTopRated(),
        MovieApi.getUpcoming(),
        MovieApi.getMovieByGenreId(12),
        MovieApi.getMovieByGenreId(28),
        MovieApi.getMovieByGenreId(16),
        MovieApi.getMovieByGenreId(35),
        MovieApi.getMovieByGenreId(27),
        MovieApi.getMovieByGenreId(53),
        MovieApi.getMovieByGenreId(14),
        MovieApi.getMovieByGenreId(36),
      ]);
      runInAction(() => {
        this.popular = popular;
        this.trending = trending;
        this.topRated = topRated;
        this.upcoming = upcoming;
        this.adventure = adventure;
        this.action = action;
        this.animation = animation;
        this.comedy = comedy;
        this.horror = horror;
        this.thriller = thriller;
        this.fantasy = fantasy;
        this.history = history;
        const withBackdrop = popular.filter((m) => m.backdrop_path);
        this.backdropMovie =
          withBackdrop[Math.floor(Math.random() * withBackdrop.length)] ?? popular[0] ?? null;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Failed to load movies';
        this.isLoading = false;
      });
    }
  }
}
