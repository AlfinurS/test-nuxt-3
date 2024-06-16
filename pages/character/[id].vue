<template>
  <div v-if="form.data">
    <nuxt-link to="/" class="link">Главная страница</nuxt-link>
    <div class="character__item-wrapper">
      <div class="table-wrapper character__table">
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">Информация о персонаже</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Персонаж</td>
              <td>
                <div class="character__item">
                  <img
                    class="character__item-avatar"
                    :src="form.data.image"
                    :alt="form.data.name"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>Имя персонажа</td>
              <td>{{ form.data.name }}</td>
            </tr>
            <tr>
              <td>Вид</td>
              <td>{{ form.data.species }}</td>
            </tr>
            <tr>
              <td>Статус</td>
              <td>{{ form.data.status }}</td>
            </tr>
            <tr>
              <td>Локация</td>
              <td>{{ form.data.location?.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { getCharacter } from '@/api/apiService';
import type { characterType } from '@/types/common';
import { characterConst } from '@/constants/common';

type formType = {
  data: characterType;
};

export default defineComponent({
  name: 'Character',
  components: {},
  setup() {
    const route = useRoute();

    const idCurrent = computed((): number => {
      const id = route.params.id;
      if (Array.isArray(id)) {
        return +id[0];
      }
      return +id;
    });
    const form = reactive<formType>({
      data: characterConst,
    });

    async function getDetailCharacter(): Promise<void> {
      try {
        const response = await getCharacter(idCurrent.value);
        form.data = response.data;
      } catch (error) {}
    }
    getDetailCharacter();

    return { form, idCurrent, getDetailCharacter };
  },
});
</script>

<style lang="scss" scoped>
.character {
  &__table {
    max-width: 1600px;
    width: 100%;
  }
  &__item {
    &-wrapper {
      display: flex;
      margin-top: 20px;
    }
    &-avatar {
      border-radius: 8px;
      max-width: 100px;
      width: 100%;
    }
  }
}
</style>
