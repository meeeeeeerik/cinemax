import { makeAutoObservable, runInAction } from 'mobx';
import MovieApi from '../api';
import { Movie } from '../types';

export class SearchStore {
  movies: Movie[] = [];
  query = '';
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async search(query: string) {
    if (!query.trim()) {
      runInAction(() => {
        this.movies = [];
        this.query = '';
      });
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.query = query;
    try {
      const results = await MovieApi.search(query);
      runInAction(() => {
        this.movies = results;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Search failed';
        this.isLoading = false;
      });
    }
  }
}
