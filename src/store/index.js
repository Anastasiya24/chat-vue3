import { createStore } from 'vuex';
import user from './user';
import messages from './messages';

const store = createStore({
  modules: {
    user,
    messages,
  },
});

export default store;
