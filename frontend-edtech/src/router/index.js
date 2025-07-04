import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/pages/Login.vue';
import Home from '@/pages/Home.vue';
import Admin from '@/pages/Admin.vue';

import auth from '@/auth';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.state.isAuthenticated;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next('/login');
    }
  }

  if (to.path === '/login' && isAuthenticated) {
    return next('/home');
  }

  next();
});

export default router;
