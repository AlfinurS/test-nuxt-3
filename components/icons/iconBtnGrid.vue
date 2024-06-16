<template>
  <iconsWrapper :width="width" :height="height" :viewBox="viewBox" class="icon">
    <g id="Grid" transform="translate(5 5.5)">
      <rect id="bounds" width="24" height="24" fill="none" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.5 2H8V7H13V2.5C13 2.36739 12.9473 2.24021 12.8536 2.14645C12.7598 2.05268 12.6326 2 12.5 2ZM13 8H8V13H12.5C12.6326 13 12.7598 12.9473 12.8536 12.8536C12.9473 12.7598 13 12.6326 13 12.5V8ZM7 7V2H2.5C2.36739 2 2.24021 2.05268 2.14645 2.14645C2.05268 2.24021 2 2.36739 2 2.5V7H7ZM2 8V12.5C2 12.6326 2.05268 12.7598 2.14645 12.8536C2.24021 12.9473 2.36739 13 2.5 13H7V8H2ZM2.5 1C2.10218 1 1.72064 1.15804 1.43934 1.43934C1.15804 1.72064 1 2.10218 1 2.5V12.5C1 12.8978 1.15804 13.2794 1.43934 13.5607C1.72064 13.842 2.10218 14 2.5 14H12.5C12.8978 14 13.2794 13.842 13.5607 13.5607C13.842 13.2794 14 12.8978 14 12.5V2.5C14 2.10218 13.842 1.72064 13.5607 1.43934C13.2794 1.15804 12.8978 1 12.5 1H2.5Z"
        :fill="iconColor"
      />
    </g>
  </iconsWrapper>
</template>

<script>
import iconsWrapper from '~/components/icons/iconsWrapper.vue';

export default {
  name: 'IconBtnGrid',
  components: {
    iconsWrapper,
  },
  props: {
    iconColor: {
      type: String,
      default: 'currentColor',
    },
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
      default: '0 0 24 24',
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  margin-top: -3px;
}
</style>
