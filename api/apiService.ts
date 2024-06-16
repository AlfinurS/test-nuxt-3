import axios from 'axios';
import type {
  apiResponse,
  IApiPaginationResp,
  characterType,
} from '@/types/common';

export const getCharactersList = (
  page?: number
): apiResponse<IApiPaginationResp> => {
  return axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
};

export const getCharacter = (id: number): apiResponse<characterType> => {
  return axios.get(`https://rickandmortyapi.com/api/character/${id}`);
};
