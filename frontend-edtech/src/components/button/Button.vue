<template>
  <div class="button-container">
    <v-btn :color="color" @click="handleClick" class="no-uppercase" dark>
      <v-icon v-if="icon" left>{{ icon }}</v-icon>
      {{ label }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>
<style scoped>
.button-container {
  position: fixed;
  top: 13%;
  right: 7%;
}
.no-uppercase {
  text-transform: none !important;
}
</style>
