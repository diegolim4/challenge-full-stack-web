<template>
  <v-card>
    <v-card-title class="text-h6"> {{ title }} </v-card-title>

    <v-data-table :headers="columns" :items="data" class="elevation-1" dense>
      <template v-slot:no-data>
        <v-alert text>Nenhum dado disponível</v-alert>
      </template>

      <template v-slot:[`item.edit`]="{ item }">
        <v-icon small color="primary" @click="$emit('edit', item)">
          mdi-pencil
        </v-icon>
      </template>

      <template v-slot:[`item.delete`]="{ item }">
        <v-icon small color="red" @click="$emit('delete', item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'tableComponent',
  props: {
    title: {
      type: String,
    },
    columns: {
      type: Array,
      required: false,
      default: () => [],
    },
    data: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 5%;
}
</style>
