import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { characterType } from '@/types/common.ts';
import { deepCompareObject } from '@/utils/deepCompareObject';

export const setCharacters = defineStore('charactersStore', () => {
  const charactersStore = ref<characterType[]>([]);
  const filteredCharacters = ref<characterType[]>([]);

  const getCharacters = computed((): characterType[] => charactersStore.value);
  const getFilteredCharacters = computed(
    (): characterType[] => filteredCharacters.value
  );

  function setCharacters(data: characterType[]) {
    // удаление дубликатов
    charactersStore.value = [...charactersStore.value, ...data];
    const charactersMap = new Map(
      charactersStore.value.map((character) => [character.id, character])
    );
    charactersStore.value = [...charactersMap].map((el) => el[1]);
  }

  function setFilteredCharacters(query: string | null) {
    filteredCharacters.value = charactersStore.value.filter((character) => {
      // исключены из глубокого поиска поля 'url', 'image', 'episode' т.к. из-за соченаий rickandmortyapi при поиске по 'rick' и 'morty' все персонажи соответствуют
      return deepCompareObject(character, query, ['url', 'image', 'episode']);
    });
  }
  return {
    charactersStore,
    filteredCharacters,
    getCharacters,
    getFilteredCharacters,
    setCharacters,
    setFilteredCharacters,
  };
});
