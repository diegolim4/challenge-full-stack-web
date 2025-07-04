<template>
  <div class="home-page">
    <InputComponent
      v-model="searchQuery"
      @button-click="getStudentById"
      placeholder="Buscar aluno..."
    />

    <TableComponent
      title="Consulta de Alunos"
      :columns="tableColumns"
      :data="students"
      @edit="handleEditStudent"
      @delete="handleDeleteStudent"
    />

    <SidebarComponent />

    <ToastComponent
      v-model="isToastVisible"
      :message="toastMessage"
      :color="toastType"
    />

    <ButtonComponent
      label="Cadastrar Aluno"
      color="info"
      icon="mdi-plus"
      @click="openStudentForm"
    />

    <v-dialog v-model="isFormVisible" max-width="600px" persistent>
      <FormComponent
        :title="formTitle"
        :fields="formFields"
        :initial-values="formData"
        button-cancel="Cancelar"
        :button-save="isEditMode ? 'Atualizar' : 'Salvar'"
        @submit="submitStudentForm"
        @cancel="handleFormCancel"
      />
    </v-dialog>

    <ConfirmModal
      :model-value="isConfirmModalVisible"
      title="Excluir Aluno"
      :message="`Deseja excluir o aluno ${studentToDelete?.name}?`"
      @update:modelValue="isConfirmModalVisible = $event"
      @confirm="deleteStudent"
    />
  </div>
</template>

<script>
import SidebarComponent from '@/components/templates/Sidebar.vue';
import TableComponent from '@/components/table/Table.vue';
import InputComponent from '@/components/input/Input.vue';
import ToastComponent from '@/components/toast/Toast.vue';
import ButtonComponent from '@/components/button/Button.vue';
import FormComponent from '@/components/form/Form.vue';
import ConfirmModal from '@/components/modal/ConfirmModal.vue';
import {
  handleError,
  formatCPF,
  formatName,
  formatDateTime,
  validateCPF,
  validateEmail,
  removeSpecialChars,
} from '@/helpers/helpers.js';
import auth from '@/auth';
import api from '@/services/api';

const TABLE_COLUMNS = [
  { text: '#', value: 'index' },
  { text: 'Registro Acadêmico', value: 'ra' },
  { text: 'Nome', value: 'name' },
  { text: 'E-mail', value: 'email' },
  { text: 'CPF', value: 'document' },
  { text: 'Status', value: 'status' },
  { text: 'Data de Entrada', value: 'createdAt' },
  { text: 'Editar', value: 'edit' },
  { text: 'Excluir', value: 'delete' },
];

const FORM_FIELDS = [
  { model: 'fullName', label: 'Nome Completo', required: true },
  { model: 'email', label: 'E-mail', type: 'email', required: true },
  { model: 'document', label: 'CPF', required: true },
];

const FORM_FIELDS_EDIT = FORM_FIELDS.map((field) =>
  field.model === 'document' ? { ...field, readonly: true } : field
).concat([{ model: 'status', label: 'Status', required: true }]);

export default {
  name: 'HomePage',
  components: {
    SidebarComponent,
    TableComponent,
    InputComponent,
    ToastComponent,
    ButtonComponent,
    FormComponent,
    ConfirmModal,
  },
  data() {
    return {
      searchQuery: '',
      students: [],
      tableColumns: TABLE_COLUMNS,
      isToastVisible: false,
      toastMessage: '',
      toastType: '',
      isFormVisible: false,
      isEditMode: false,
      currentStudentId: null,
      formFields: FORM_FIELDS,
      formData: {
        fullName: '',
        email: '',
        document: '',
        status: true,
      },
      isConfirmModalVisible: false,
      studentToDelete: null,
    };
  },
  computed: {
    formTitle() {
      return this.isEditMode ? 'Editar Aluno' : 'Novo Aluno';
    },
  },
  methods: {
    showToast(message, type) {
      this.toastMessage = message;
      this.toastType = type;
      this.isToastVisible = true;
    },

    async getAllStudents() {
      try {
        const { data } = await api.get('students');
        this.students = data.students.map((student, index) =>
          this.handleStudentData(student, index + 1)
        );
      } catch (error) {
        console.error(handleError(error));
        this.showToast('Erro ao buscar alunos. Tente novamente!', 'error');
      }
    },

    async getStudentById(inputValue) {
      if (!inputValue?.trim()) {
        this.showToast('Preencha o campo de busca!', 'warning');
        await this.getAllStudents();
        return;
      }

      try {
        const { data } = await api.get(`students/${inputValue}`);

        this.students = [this.handleStudentData(data.student, 1)];
      } catch (error) {
        console.error(handleError(error));
        this.showToast('Erro ao buscar aluno. Tente novamente!', 'error');
        await this.getAllStudents();
      }
    },

    handleStudentData(student, index) {
      return {
        index,
        id: student.id,
        ra: student.studentRecord,
        name: formatName(student.fullName),
        email: student.email,
        document: formatCPF(student.document),
        status: student.status ? 'Ativo' : 'Inativo',
        createdAt: formatDateTime(student.createdAt),
      };
    },

    openStudentForm() {
      this.isFormVisible = true;
    },

    validateForm(data) {
      if (!data.fullName || !data.email || !data.document) {
        this.showToast('Preencha todos os campos!', 'warning');
        return false;
      }
      if (!validateEmail(data.email)) {
        this.showToast('Formato de e-mail inválido.', 'warning');
        return false;
      }
      if (!validateCPF(data.document)) {
        this.showToast('Formato de CPF inválido.', 'warning');
        return false;
      }
      return true;
    },

    async submitStudentForm(data) {
      if (!this.validateForm(data)) return;

      if (this.isEditMode) {
        await this.updateStudent(data);
      } else {
        await this.createStudent(data);
      }
    },

    async createStudent(data) {
      try {
        const payload = {
          fullName: data.fullName,
          email: data.email,
          document: removeSpecialChars(data.document),
          createdBy: auth.getIdAdmin(),
        };
        const response = await api.post('students', payload);

        if (!response.data.success) throw new Error();

        this.showToast('Aluno cadastrado com sucesso!', 'success');
        this.resetForm();
        this.isFormVisible = false;
        await this.getAllStudents();
      } catch (error) {
        console.error(handleError(error));
        const message =
          error.response?.status === 409
            ? 'Já existe um cadastro!'
            : 'Erro ao cadastrar aluno. Tente novamente!';
        this.showToast(message, 'error');
      }
    },

    async updateStudent(data) {
      try {
        const payload = {
          fullName: data.fullName,
          email: data.email,
          status: data.status === 'Ativo',
        };
        await api.put(`students/${this.currentStudentId}`, payload);

        this.showToast('Aluno atualizado com sucesso!', 'success');
        this.resetForm();
        this.isFormVisible = false;
        await this.getAllStudents();
      } catch (error) {
        console.error(handleError(error));
        this.showToast('Erro ao atualizar aluno. Tente novamente!', 'error');
        this.resetForm();
      }
    },

    handleEditStudent(student) {
      this.isEditMode = true;
      this.isFormVisible = true;
      this.currentStudentId = student.id;
      this.formFields = FORM_FIELDS_EDIT;
      this.formData = {
        id: student.id,
        fullName: student.name,
        email: student.email,
        document: student.document,
        status: student.status,
      };
    },

    handleDeleteStudent(student) {
      this.studentToDelete = student;
      this.isConfirmModalVisible = true;
    },

    async deleteStudent() {
      try {
        await api.delete(`students/${this.studentToDelete.id}`);
        this.showToast('Aluno excluído com sucesso!', 'success');
        await this.getAllStudents();
      } catch (error) {
        console.error(handleError(error));
        this.showToast('Erro ao excluir aluno. Tente novamente!', 'error');
      } finally {
        this.studentToDelete = null;
        this.isConfirmModalVisible = false;
      }
    },

    resetForm() {
      this.formData = {
        fullName: '',
        email: '',
        document: '',
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
    this.getAllStudents();
  },
};
</script>

<style scoped>
.home-page {
  padding: 16px;
}
</style>
