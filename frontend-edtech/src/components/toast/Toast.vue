<template>
  <v-snackbar
    v-model="visible"
    :timeout="timeout"
    :color="color"
    :top="top"
    :right="right"
    :left="left"
    dark
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'ToastComponent',
  props: {
    value: Boolean,
    message: String,
    color: {
      type: String,
      default: '',
    },
    timeout: {
      type: Number,
      default: 1500,
    },
    top: {
      type: Boolean,
      default: true,
    },    
    right: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    }  
  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
