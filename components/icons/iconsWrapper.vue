<template>
  <div
    class="wrapper"
    :style="iconWrapperStyle"
  >
    <svg
      v-if="src === ''"
      :id="id"
      class="image"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      :viewBox="viewBox"
    >
      <slot />
    </svg>
    <img
      v-else
      class="image"
      :src="src"
      alt="icon"
    >
  </div>
</template>

<script>
export default {
  name: "IconsWrapper",
  props: {
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
    viewBox: {
      type: String,
      default: "0 0 24 24",
    },
    id: {
      type: String,
      default: "icon",
    },
    src: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconWrapperStyle() {
      return `width: ${+this.width}px; height:${+this.height}px;`;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  overflow: hidden;
}
.image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  min-width: 100%;
  min-height: 100%;
  width: 100%;
}
</style>
