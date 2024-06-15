<template>
  <div class="pagination">
    <div class="pagination__item" @click="prevPage">&#171;</div>
    <div
      v-for="page in pagesToRender"
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
    maxPagesCountAfter: {
      type: Number,
      default: 6,
    },
    maxPagesCountBefore: {
      type: Number,
      default: 2,
    },
  },

  setup(props, { emit }) {
    const pagesCounter = computed((): number => {
      if (props.params.count === 0) return 1;
      return Math.ceil(props.params.count / props.params.page_size);
    });

    const pagesToRender = computed((): number[] => {
      const fullPagesList: number[] = [];
      for (let i = 1; i <= pagesCounter.value; i++) {
        fullPagesList.push(i);
      }

      const currentPageIdx = fullPagesList.findIndex(
        (el) => el === props.params.page
      );
      if (currentPageIdx === -1) {
        return [-1];
      }

      let countNext: number = currentPageIdx + 1 + props.maxPagesCountAfter;
      let countBefore: number = currentPageIdx - props.maxPagesCountBefore;
      if (countBefore < 0) countBefore = 0;

      const result = fullPagesList.slice(countBefore, countNext);
      return result;
    });

    const setPage = (page: number): void => {
      emit('setPage', page);
    };

    const prevPage = (): void => {
      if (props.params.page - 1 < 1) return;
      setPage(props.params.page - 1);
    };

    const nextPage = (): void => {
      if (props.params.page + 1 > pagesCounter.value) return;
      setPage(props.params.page + 1);
    };
    return {
      pagesCounter,
      pagesToRender,
      setPage,
      prevPage,
      nextPage,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
.pagination {
  display: flex;
  &__item {
    border-radius: 3px;
    box-sizing: border-box;
    color: $color-primary-text;
    cursor: pointer;
    user-select: none;
    display: inline-block;
    height: 32px;
    margin-right: 8px;
    padding: 7px 12px;
    text-align: center;
    font-size: 14px;
    &:hover {
      background: $color-bg-light;
      color: $color-primary-hover;
    }
    &--active {
      background: $color-primary;
      color: $color-light-text;
      cursor: default;
      &:hover {
        background: $color-primary;
        color: $color-light-text;
      }
    }
  }
}
</style>
