export type objectType = {
  [key: string]: objectType | string | number | null | string[];
};

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
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type paginationType = {
  page: number;
  page_size: number;
  count: number;
};

export interface IApiPaginationResp {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: [];
}

export interface IFormType {
  data: IApiPaginationResp;
  paginationData: paginationType;
  query: string | null;
}
