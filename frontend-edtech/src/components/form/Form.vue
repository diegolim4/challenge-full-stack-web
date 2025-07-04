<template>
  <v-form @submit.prevent="submitForm">
    <v-card class="pa-4">
      <v-card-title class="text-h6">{{ title }}</v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              v-for="(field, index) in visibleFields"
              :key="index"
              :cols="field.cols || 12"
            >
              <v-select
                v-if="field.model === 'status'"
                v-model="formData[field.model]"
                :label="field.label"
                :items="['Ativo', 'Inativo']"
                :required="field.required || false"
              />
              <v-text-field
                v-else
                v-model="formData[field.model]"
                :label="field.label"
                :type="field.type || 'text' || 'password'" 
                :rules="field.rules || []"
                :required="field.required || false"
                :readonly="field.readonly || false"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="success" @click="submitForm">{{ buttonSave }}</v-btn>
        <v-btn color="error" @click="cancelForm">{{ buttonCancel }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'FormComponent',
  props: {
    title: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      required: true,
    },
    buttonSave: {
      type: String,
      default: 'Salvar',
    },
    buttonCancel: {
      type: String,
      default: 'Cancelar',
    },
    initialValues: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  watch: {
    initialValues: {
      handler(newValues) {
        const updated = {};
        this.fields.forEach((f) => {
          updated[f.model] = newValues[f.model] ?? '';
        });
        this.formData = updated;
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    visibleFields() {
      return this.fields.filter((field) => {
        if (field.model === 'status') {
          return this.initialValues?.id !== undefined;
        }
        return true;
      });
    },
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.formData);
    },
    cancelForm() {
      this.formData = {};
      this.$emit('cancel');
    },
  },
};
</script>
