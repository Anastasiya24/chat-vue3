import { createRouter, createWebHistory } from 'vue-router';
import getUserId from './services/getUserId';
import ChatPage from './pages/ChatPage.vue';
import GreetingPage from './pages/GreetingPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: ChatPage,
    // meta: {
    //   nickName: true,
    // },
  },
  {
    path: '/greeting',
    name: 'Greeting',
    component: GreetingPage,
    // meta: {
    //   nickName: false,
    // },
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isUserExist = getUserId();
  if (to.name !== 'Greeting' && !isUserExist) next({ name: 'Greeting' });
  if (to.name === 'Greeting' && isUserExist) next({ name: 'Chat' });
  else next();
});

export default router;
