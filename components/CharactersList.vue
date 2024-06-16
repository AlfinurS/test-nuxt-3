<template>
  <div class="catalog">
    <input
      type="text"
      class="catalog__search-input input"
      placeholder="Поиск персонажа"
      v-model="form.query"
      @input="setFilteredCharacters()"
    />

    <div>
      <button v-if="!isList" class="btn btn-primary" @click="setList">
        <iconBtnList />
      </button>

      <button v-else class="btn btn-primary" @click="setList">
        <iconBtnGrid />
      </button>
    </div>
  </div>

  <div class="catalog__wrapper">
    <div class="catalog__grid" :class="{ catalog__list: isList }">
      <div
        v-for="character in computedCharacters"
        :key="character.id"
        class="catalog__item"
      >
        <nuxt-link :to="`/character/${character.id}`">
          <div class="catalog__item-wrapp">
            <img
              class="catalog__item-avatar"
              :src="getImage(character.image)"
              :alt="character.name"
            />
            <div class="catalog__item-wrapper">
              <span class="catalog__item-name">{{ character.name }}</span>
              <p>{{ character.species }}</p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>

  <Pagination
    v-if="!form.query && form.data.results.length > 0"
    :params="form.paginationData"
    class="catalog__pagination"
    @setPage="setPage"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCharactersList } from '@/api/apiService';
import { setCharacters } from '@/store/charactersStore';
import { usePageControl } from '@/composables/usePageControl';
import type {
  characterType,
  IApiPaginationResp,
  paginationType,
  IFormType,
} from '@/types/common';
import Pagination from '@/components/Pagination.vue';
import iconBtnGrid from '@/components/icons/iconBtnGrid.vue';
import iconBtnList from '@/components/icons/iconBtnList.vue';

const initData = (): IApiPaginationResp => ({
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
});

const initPaginationData = (): paginationType => ({
  page: 1,
  page_size: 20,
  count: 0,
});

interface ICharactersData extends IFormType {}

export default defineComponent({
  name: 'CharactersList',
  components: {
    Pagination,
    iconBtnGrid,
    iconBtnList,
  },
  setup() {
    const store = setCharacters();
    const filteredCharacters = computed(
      (): characterType[] => store.getFilteredCharacters
    );

    const form = reactive<ICharactersData>({
      data: initData(),
      paginationData: initPaginationData(),
      query: null,
    });

    const { setPage } = usePageControl(form, loadData);

    async function loadData(): Promise<void> {
      try {
        const response = await getCharactersList(form.paginationData.page);
        if (response) {
          form.data = response.data;
          form.paginationData.count = response.data.info.count;
          store.setCharacters(response.data.results);
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadData();

    const setFilteredCharacters = (): void => {
      store.setFilteredCharacters(form.query);
    };

    const computedCharacters = computed((): characterType[] => {
      if (form.query) {
        return filteredCharacters.value;
      } else {
        return form.data.results;
      }
    });

    const isList = ref<boolean>(false);
    const setList = () => {
      isList.value = !isList.value;
    };

    const getImage = (image: string): string => {
      return image;
    };

    return {
      form,
      isList,
      filteredCharacters,
      getImage,
      loadData,
      setPage,
      setFilteredCharacters,
      setList,
      computedCharacters,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.catalog {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &__wrapper {
    margin-bottom: 40px;
  }
  &__search {
    &-input {
      max-width: 280px;
      width: 100%;
      line-height: 28px;
      margin-right: 16px;
    }
  }
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
    @media (min-width: 748px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  &__item {
    display: flex;
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    border: 1px solid #f4f5f5;
    background: $color-bg-light;
    &-wrapp {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &-wrapper {
      display: flex;
      flex-direction: column;
      line-height: normal;
    }
    &-avatar {
      border-radius: 50%;
      margin-right: 20px;
      width: 50px;
      height: 50px;
    }
    &-name {
      color: #1d1d1d;
      font-size: 17px;
      font-weight: 700;
      line-height: normal;
      margin-right: 8px;
    }
  }
}
.catalog__list {
  display: flex;
  flex-direction: column;
  &-item {
    display: flex;
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    border: 1px solid #f4f5f5;
    background: $color-bg-light;
    margin-bottom: 12px;
  }
}
</style>
