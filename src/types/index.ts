export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids?: number[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  department: string;
  job: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  name: string;
}

export interface MovieDetail extends Movie {
  runtime: number;
  tagline: string;
  genres: Genre[];
  videos: { results: Video[] };
  credits: { cast: CastMember[]; crew: CrewMember[] };
  similar: { results: Movie[] };
}
