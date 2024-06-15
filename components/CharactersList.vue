<template>
  <div class="catalog__head">
    <input
      type="text"
      class="catalog__search-input input"
      placeholder="Поиск персонажа"
    />
  </div>

  <div class="page__list-wrapper">
    <div class="page__list">
      <div
        v-for="character in form.data.results"
        :key="character.id"
        class="page__item"
      >
        <div class="page__item-wrapp">
          <img
            class="page__item-avatar"
            :src="getImage(character.image)"
            :alt="character.name"
          />
          <span class="page__item-name">{{ character.name }}</span>
        </div>
      </div>
    </div>
  </div>

  <Pagination
    :params="form.paginationData"
    class="catalog__pagination"
    @setPage="setPage"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCharactersList } from '@/api/apiService';
import type {
  characterType,
  apiCharacterRespType,
  paginationType,
} from '@/types/common';
import Pagination from '@/components/Pagination.vue';

type formType = {
  data: apiCharacterRespType;
  paginationData: paginationType;
};

const initData = (): apiCharacterRespType => ({
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

export default defineComponent({
  name: 'CharactersList',
  components: {
    Pagination,
  },
  setup() {
    const form = reactive<formType>({
      data: initData(),
      paginationData: initPaginationData(),
    });

    async function loadCharacters(): Promise<void> {
      try {
        const response = await getCharactersList(form.paginationData.page);
        if (response) {
          console.log(response);
          form.data = response.data;
          form.paginationData.count = response.data.info.count;
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadCharacters();

    const getImage = (image: string): string => {
      return image;
    };

    const setPage = (page: number): void => {
      form.paginationData.page = page;
      loadCharacters();
    };

    return { form, getImage, loadCharacters, setPage };
  },
});
</script>

<style lang="scss" scoped>
.catalog {
  &__head {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &-btns {
      display: flex;
    }
  }
  &__search {
    &-input {
      max-width: 280px;
      width: 100%;
      margin-right: 20px;
    }
  }
  &__pagination {
    margin-right: 20px;
  }
}
.page {
  &__list {
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 10px;
    @media (min-width: 748px) {
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }
    @media (min-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    &-wrapper {
      margin-bottom: 40px;
    }
  }
  &__item {
    display: flex;
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    border: 1px solid #f4f5f5;
    background: white;
    &-wrapp {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &-btn {
      cursor: pointer;
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
</style>