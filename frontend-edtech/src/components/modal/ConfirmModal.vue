<template>
  <v-dialog v-model="internalDialog" max-width='500px' persistent>
    <v-card>
      <v-card-title class='text-h6'>{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color='blue' @click="confirm">Confirmar</v-btn>
        <v-btn text color='red' @click="close">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    modelValue: Boolean,
    title: {
      type: String,
      default: 'Confirmação',
    },
    message: {
      type: String,
      default: 'Tem certeza?',
    },
  },
  emits: ['update:modelValue', 'confirm'],
  computed: {
    internalDialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    close() {
      this.internalDialog = false;
    },
    confirm() {
      this.$emit('confirm');
      this.close();
    },
  },
};
</script>
