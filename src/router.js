import { createRouter, createWebHistory } from 'vue-router';

// pages
// lazy-loading
const ChatPage = () => import('./pages/ChatPage');
const GreetingPage = () => import('./pages/GreetingPage');
const NotFoundPage = () => import('./pages/NotFoundPage');

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: ChatPage,
    meta: {
      nickName: true,
    },
  },
  {
    path: '/greeting',
    name: 'Greeting',
    component: GreetingPage,
    meta: {
      nickName: false,
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundPage,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
