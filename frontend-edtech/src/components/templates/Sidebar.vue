<template>
  <div>
    <v-app-bar app color="blue lighten-3" flat>
      <v-btn icon @click="openOptions = !openOptions">
        <v-icon>{{ 'mdi-menu' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="openOptions"
      app
      color="blue lighten-3"
      temporary
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="(item, index) in arrOptions"
          :key="index"
          link
          :to="item.to"
          @click="handleClick(item)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import auth from '@/auth';
export default {
  name: 'SidebarComponent',
  data() {
    return {
      openOptions: false,
      arrOptions: [
        { title: 'Estudantes', icon: 'mdi-school', to: '/home' },
        { title: 'Admin', icon: 'mdi-account-cog', to: '/admin' },
        { title: 'Sair', icon: 'mdi-exit-to-app', to: null, action: 'logout' },
      ],
    };
  },
  methods: {
    logout() {
      auth.logout();
      this.$router.push({ name: 'login' });
    },

    handleClick(item) {
      if (item.action === 'logout') {
        this.logout();
      } else if (item.to) {
        this.$router.push(item.to);
      }
      this.openOptions = false;
    },
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
  padding: 2%;
}
</style>
