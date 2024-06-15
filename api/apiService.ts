import axios from 'axios';
import type { apiResponse, apiCharacterRespType } from '@/types/common';

export const getCharactersList = (
  page?: number
): apiResponse<apiCharacterRespType> => {
  return axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
};
