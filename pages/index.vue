<template>
  <div class="catalog">
    <nuxt-link to="/character">Go to About Page</nuxt-link>
    <div class="catalog__body">
      <CharactersList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CharactersList from '@/components/CharactersList.vue';
import Pagination from '@/components/Pagination.vue';
import type { paginationType } from '@/types/common';

type formType = {
  paginationData: paginationType;
};

const initPaginationData = (): paginationType => ({
  page: 1,
  page_size: 10,
  count: 0,
});

export default defineComponent({
  name: 'IndexPage',
  components: {
    CharactersList,
    Pagination,
  },
  setup() {
    const form = reactive<formType>({
      paginationData: initPaginationData(),
    });

    return { form };
  },
});
</script>

<style lang="scss" scoped>
.catalog {
  margin-left: 8px;
  margin-right: 8px;
  @media (min-width: 576px) {
    margin-left: 20px;
    margin-right: 20px;
  }
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
</style>
