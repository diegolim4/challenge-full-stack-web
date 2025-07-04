<template>
  <div class="input">
    <input
      ref="inputField"
      class="input-field"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
    />
    <button class="input-button" @click="handleClick" :disabled="disabled">
      Pesquisar
    </button>
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$nextTick(() => {
        this.$emit('button-click', this.$refs.inputField?.value);
      });
    },
  },
};
</script>
<style scoped>
.input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6%;
  margin-bottom: -3%;
  gap: 8px;
}

.input-field {
  width: 50%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.input-field:focus {
  outline: none;
  border-color: #409eff;
}

.input-button {
  padding: 10px 14px;
  font-size: 14px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.input-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
