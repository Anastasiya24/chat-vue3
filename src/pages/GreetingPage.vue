<template>
  <div class="block">
    <h1 class="title">Nice to meet you</h1>
    <p class="subtitle">What is your name?</p>
    <Input
      :value="nickName"
      placeholder="Nickname"
      @onSave="onSaveNickName"
      @onChangeValue="onChangeNickName"
    />
    <Button
      text="Chat!"
      @onClick="onSaveNickName"
      :invalid="isInvalidNickName"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { EDIT_USER_NAME } from '../store/actions.type';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import { useStore } from 'vuex';

export default {
  components: { Input, Button },
  setup() {
    const store = useStore();

    const nickName = ref(null);
    const isInvalidNickName = computed(
      () => !nickName.value || !nickName.value?.trim()
    );

    const onChangeNickName = (newVal) => (nickName.value = newVal);

    const onSaveNickName = () => {
      store.dispatch(EDIT_USER_NAME, nickName.value);
    };

    return { nickName, isInvalidNickName, onChangeNickName, onSaveNickName };
  },
};
</script>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
}

.block:deep() .button {
  margin-top: 20px;
  padding: 15px 25px;
}

.title {
  text-shadow: 5px -2px 0px var(--secondary-color);
  font-family: 'NotoSansTC Bold';
  font-size: 65px;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.subtitle {
  padding: 10px 0;
  color: var(--primary-color);
  font-family: 'NotoSansTC Bold';
  font-size: 17px;
}

@media (max-width: 600px) {
  .wrapper {
    margin: 40px 20px;
  }

  .title {
    margin-bottom: 30px;
  }
}
</style>
