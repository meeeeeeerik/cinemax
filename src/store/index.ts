import { createContext, useContext } from 'react';
import { MovieStore } from './movieStore';
import { SearchStore } from './searchStore';
import { MovieDetailStore } from './movieDetailStore';

export const movieStore = new MovieStore();
export const searchStore = new SearchStore();
export const movieDetailStore = new MovieDetailStore();

interface StoreContextType {
  movieStore: MovieStore;
  searchStore: SearchStore;
  movieDetailStore: MovieDetailStore;
}

export const StoreContext = createContext<StoreContextType>({
  movieStore,
  searchStore,
  movieDetailStore,
});

export const useStores = () => useContext(StoreContext);
