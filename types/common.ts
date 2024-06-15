export type coreResponse<T> = {
  data: T;
  statusText: string;
  status: number;
  headers: object;
  config: object;
  request: object;
  errors?: Record<string, string>;
  message?: string;
};

export type apiResponse<T> = Promise<coreResponse<T>>;

export type characterType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
};

export type apiCharacterRespType = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: characterType[];
};

export type paginationType = {
  page: number;
  page_size: number;
  count: number;
};
