<template>
  <div class="login-container">
    <div class="form-section">
      <FormComponent
        :title="'Bem-vindo a EdTech'"
        :fields="formFields"
        :initial-values="formData"
        :button-save="'Entrar'"
        :button-cancel="'Limpar'"
        @submit="submitLoginForm"
      />
    </div>

    <div class="login-image">
      <img src="@/assets/login-image.jpg" alt="Login-img" />
    </div>

    <ToastComponent
      v-model="isToastVisible"
      :message="toastMessage"
      :color="toastType"
    />
  </div>
</template>

<script>
import FormComponent from '@/components/form/Form.vue';
import ToastComponent from '@/components/toast/Toast.vue';
import api from '@/services/api';
import { validateEmail, handleError } from '@/helpers/helpers.js';
import auth from '@/auth';

const FORM_FIELDS = [
  { model: 'email', label: 'E-mail', type: 'email', required: true },
  { model: 'password', label: 'Senha', type: 'password', required: true },
];

export default {
  name: 'LoginPage',
  components: {
    FormComponent,
    ToastComponent,
  },
  data() {
    return {
      formFields: FORM_FIELDS,
      isToastVisible: false,
      toastMessage: '',
      toastType: '',
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    showToast(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.isToastVisible = true;
    },

    validateForm(data) {
      if (!data.email || !data.password) {
        this.showToast('Preencha todos os campos!', 'warning');
        return false;
      }
      if (!validateEmail(data.email)) {
        this.showToast('Formato de e-mail inválido.', 'warning');
        return false;
      }
      return true;
    },

    resetForm() {
      this.formData = {
        email: '',
        password: '',
      };
      this.formFields = FORM_FIELDS;
      this.isEditMode = false;
      this.isFormVisible = false;
    },

    async submitLoginForm(data) {
      if (!this.validateForm(data)) return;
      await this.login(data);
    },

    async login(data) {
      try {
        const response = await api.post('auth', {
          email: data.email,
          password: data.password,
        });
        if (!response.data.success) throw new Error();

        const accessKey = response.data.data;

        auth.login(accessKey);

        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error(handleError(error));
        this.showToast(
          'E-mail ou senha incorretos. Verifique e tente novamente.',
          'error'
        );
        this.resetForm();
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  flex-direction: row;
}

.form-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
}

.login-image {
  flex: 1.5;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}

/* Responsivo para telas menores */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column; /* muda de row para column */
  }

  .form-section,
  .login-image {
    flex: unset;
    width: 100%;
    height: auto;
  }

  .form-section {
    padding: 1rem;
  }

  .login-image img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>
