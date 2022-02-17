<template>
  <div>
    <div class="container">
      <div class="header">
        <div class="logo">
          <img :src="chatSvg" />
        </div>
        <div class="profileIcon" @click="setOpenAccountModal">
          {{ modifyFirstLetterToUpperCase(name) }}
        </div>
      </div>
      <div class="content"><slot></slot></div>

      <div class="footer">
        <div class="logo">
          <img :src="chatSvg" />
        </div>
        <p>Chat app</p>
      </div>
    </div>
    <Modal
      v-show="isOpenAccountModal"
      @onClose="setOpenAccountModal"
      title="Profile Settings"
    >
      <ProfileSettings :name="name" @onChangeUserName="onChangeUserName" />
    </Modal>
  </div>
</template>

<script>
import Modal from '../components/Modal';
import ProfileSettings from '../components/ProfileSettings';
import chatSvg from '../assets/icons/chat.svg';
import { EDIT_USER_NAME } from '../store/actions.type';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: { ProfileSettings, Modal },
  props: {
    name: String,
  },
  setup() {
    const store = useStore();

    const isOpenAccountModal = ref(false);

    const setOpenAccountModal = () => {
      const currentState = isOpenAccountModal.value;
      isOpenAccountModal.value = !currentState;
    };

    const onChangeUserName = (value) => {
      store.dispatch(EDIT_USER_NAME, value);
      setOpenAccountModal();
    };

    const modifyFirstLetterToUpperCase = (value) =>
      value?.substring(0, 1)?.toUpperCase() || '';

    return {
      chatSvg,
      isOpenAccountModal,
      setOpenAccountModal,
      onChangeUserName,
      modifyFirstLetterToUpperCase,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;

  background-color: var(--primary-color);
  padding: 10px 20px;
}

.logo img {
  width: 30px;
  filter: invert(1);
}

.profileIcon {
  cursor: pointer;
  background-color: var(--dark-color);
  color: var(--white-color);

  width: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  flex: 1 0 auto;
}

.footer {
  background-color: var(--primary-color);
  padding: 20px;

  display: flex;
  align-items: center;
}

.footer p {
  color: var(--white-color);
  font-size: 20px;
  margin-left: 20px;
}
</style>
