import { makeAutoObservable, runInAction } from 'mobx';
import MovieApi from '../api';
import { MovieDetail } from '../types';

export class MovieDetailStore {
  movie: MovieDetail | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMovie(id: number | string) {
    this.isLoading = true;
    this.error = null;
    this.movie = null;
    try {
      const movie = await MovieApi.getMovie(id);
      runInAction(() => {
        this.movie = movie;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Failed to load movie';
        this.isLoading = false;
      });
    }
  }
}
