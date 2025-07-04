<template>
  <div>
    <SidebarComponent />

    <TableComponent
      title="Administradores"
      :columns="tableColumns"
      :data="admins"
      @edit="handleEditAdmin"
      @delete="handleDeleteAdmin"
    />

    <ButtonComponent
      label="Novo Administrador"
      color="info"
      icon="mdi-plus"
      @click="openAdminForm"
    />

    <v-dialog v-model="isFormVisible" max-width="600px" persistent>
      <FormComponent
        :title="formTitle"
        :fields="formFields"
        :initial-values="formData"
        button-cancel="Cancelar"
        :button-save="isEditMode ? 'Atualizar' : 'Salvar'"
        @submit="submitAdminForm"
        @cancel="handleFormCancel"
      />
    </v-dialog>

    <ToastComponent
      v-model="isToastVisible"
      :message="toastMessage"
      :color="toastType"
    />

    <ConfirmModal
      :model-value="isConfirmModalVisible"
      title="Excluir"
      :message="`Deseja excluir ${adminToDelete?.name}?`"
      @update:modelValue="isConfirmModalVisible = $event"
      @confirm="deleteAdmin"
    />
  </div>
</template>

<script>
import SidebarComponent from '@/components/templates/Sidebar.vue';
import TableComponent from '@/components/table/Table.vue';
import ToastComponent from '@/components/toast/Toast.vue';
import ButtonComponent from '@/components/button/Button.vue';
import FormComponent from '@/components/form/Form.vue';
import ConfirmModal from '@/components/modal/ConfirmModal.vue';
import {
  handleError,
  formatName,
  formatDateTime,
  validateEmail,
} from '@/helpers/helpers.js';
import api from '@/services/api';

const TABLE_COLUMNS = [
  { text: '#', value: 'index' },
  { text: 'Nome', value: 'name' },
  { text: 'E-mail', value: 'email' },
  { text: 'Status', value: 'status' },
  { text: 'Data de Entrada', value: 'createdAt' },
  { text: 'Editar', value: 'edit' },
  { text: 'Excluir', value: 'delete' },
];

const FORM_FIELDS = [
  { model: 'fullName', label: 'Nome Completo', required: true },
  { model: 'email', label: 'E-mail', type: 'email', required: true },
  { model: 'password', label: 'Senha', type: 'password', required: true },
];

const FORM_FIELDS_EDIT = [
  ...FORM_FIELDS,
  { model: 'status', label: 'Status', required: true },
];

export default {
  name: 'AdminPage',
  components: {
    SidebarComponent,
    TableComponent,
    ToastComponent,
    ButtonComponent,
    FormComponent,
    ConfirmModal,
  },
  data() {
    return {
      tableColumns: TABLE_COLUMNS,
      formFields: FORM_FIELDS,
      admins: [],
      isFormVisible: false,
      isEditMode: false,
      currentAdmintId: null,
      isToastVisible: false,
      toastMessage: '',
      toastType: '',
      isConfirmModalVisible: false,
      adminToDelete: null,
      formData: {
        fullName: '',
        email: '',
        password: '',
        status: true,
      },
    };
  },

  computed: {
    formTitle() {
      return this.isEditMode ? 'Editar' : 'Novo';
    },
  },

  methods: {
    showToast(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.isToastVisible = true;
    },

    async getAllAdmins() {
      try {
        const { data } = await api.get('admin');
        this.admins = data.admins.map((admin, index) =>
          this.handleAdminData(admin, index + 1)
        );
      } catch (error) {
        console.error(handleError(error));
        this.showToast('Erro na buscar. Tente novamente!', 'error');
      }
    },

    handleAdminData(admin, index) {
      return {
        index,
        id: admin.id,
        name: formatName(admin.fullName),
        email: admin.email,
        password: admin.password,
        status: admin.status ? 'Ativo' : 'Inativo',
        createdAt: formatDateTime(admin.createdAt),
      };
    },

    openAdminForm() {
      this.isFormVisible = true;
    },

    validateForm(data) {
      if (!data.fullName || !data.email) {
        this.showToast('Preencha todos os campos!', 'warning');
        return false;
      }
      if (!validateEmail(data.email)) {
        this.showToast('Formato de e-mail inválido.', 'warning');
        return false;
      }
      return true;
    },

    async submitAdminForm(data) {
      if (!this.validateForm(data)) return;

      if (this.isEditMode) {
        await this.updateAdmin(data);
      } else {
        await this.createAdmin(data);
      }
    },

    async createAdmin(data) {
      try {
        const payload = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        };
        const response = await api.post('admin', payload);

        if (!response.data.success) throw new Error();

        this.showToast('Admin cadastrado com sucesso!', 'success');
        this.resetForm();
        this.isFormVisible = false;
        await this.getAllAdmins();
      } catch (error) {
        console.error(handleError(error));
        const message =
          error.response?.status === 409
            ? 'Já existe um cadastro!'
            : 'Erro ao cadastrar admin. Tente novamente!';
        this.showToast(message, 'error');
      }
    },

    async updateAdmin(data) {
      try {
        const payload = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          status: data.status === 'Ativo',
        };
        await api.put(`admin/${this.currentAdmintId}`, payload);

        this.showToast('Admin atualizado com sucesso!', 'success');
        this.resetForm();
        this.isFormVisible = false;
        await this.getAllAdmins();
      } catch (error) {
        console.error(handleError(error));
        this.showToast('Erro ao atualizar admin. Tente novamente!', 'error');
        this.resetForm();
      }
    },

    handleEditAdmin(admin) {
      this.isEditMode = true;
      this.isFormVisible = true;
      this.currentAdmintId = admin.id;
      this.formFields = FORM_FIELDS_EDIT;
      this.formData = {
        id: admin.id,
        fullName: admin.name,
        password: admin.password,
        email: admin.email,
        status: admin.status,
      };
    },

    handleDeleteAdmin(admin) {
      this.adminToDelete = admin;
      this.isConfirmModalVisible = true;
    },

    async deleteAdmin() {
      try {
        await api.delete(`admin/${this.adminToDelete.id}`);
        this.showToast('Admin excluído com sucesso!', 'success');
        await this.getAllAdmins();
      } catch (error) {
        console.error(handleError(error));
        const message = error.response.data.message.includes(
          'Foreign key violation'
        )
          ? 'Este admin está vinculado a registros de estudantes.'
          : 'Erro ao excluir. Tente novamente!';
        this.showToast(message, 'error');
      } finally {
        this.adminToDelete = null;
        this.isConfirmModalVisible = false;
      }
    },

    resetForm() {
      this.formData = {
        fullName: '',
        email: '',
        password: '',
        status: true,
      };
      this.formFields = FORM_FIELDS;
      this.isEditMode = false;
      this.isFormVisible = false;
    },

    handleFormCancel() {
      this.resetForm();
    },
  },
  mounted() {
    this.getAllAdmins();
  },
};
</script>
