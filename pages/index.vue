<template>
  <div class="catalog">
    <CharactersList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CharactersList from '@/components/CharactersList.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    CharactersList,
  },
  setup() {
    return {};
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
}
</style>
