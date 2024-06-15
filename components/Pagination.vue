<template>
  <div class="pagination">
    <div class="pagination__item" @click="prevPage">&#171;</div>
    <div
      v-for="page in pagesCounter"
      :key="page"
      class="pagination__item"
      :class="{ 'pagination__item--active': page === params.page }"
      @click="setPage(page)"
    >
      {{ page }}
    </div>
    <div class="pagination__item" @click="nextPage">&#187;</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { paginationType } from '@/types/common';

export default defineComponent({
  name: 'Pagination',

  emits: ['setPage'],
  props: {
    params: {
      type: Object as PropType<paginationType>,
      default: () => ({
        page: 1,
        page_size: 20,
        count: 0,
      }),
    },
  },

  setup(props, { emit }) {
    const pagesCounter = computed(() => {
      if (props.params.count === 0) return 1;
      return Math.ceil(props.params.count / props.params.page_size);
    });

    const setPage = (page: number) => {
      emit('setPage', page);
    };

    const prevPage = () => {
      if (props.params.page - 1 < 1) return;
      setPage(props.params.page - 1);
    };

    const nextPage = () => {
      if (props.params.page + 1 > pagesCounter.value) return;
      setPage(props.params.page + 1);
    };
    return {
      pagesCounter,
      setPage,
      prevPage,
      nextPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  &__item {
    cursor: pointer;
    min-width: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blue;
    color: white;
    border: blue;
    border-radius: 6px;
    margin-left: 2px;
    margin-right: 2px;
    max-height: 32px;
    &:hover {
      background-color: #111;
    }
    &--active {
      background-color: blue;
    }
  }
}
</style>
