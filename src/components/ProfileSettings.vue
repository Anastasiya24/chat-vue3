<template>
  <div class="wrapper">
    <h1>Your nickname: {{ name }}</h1>
    <h1>Change your nickname</h1>
    <Input
      :value="nickName"
      placeholder="Nickname"
      @onSave="onSaveNickName"
      @onChangeValue="onChangeNickName"
    />
    <Button
      text="Change"
      @onClick="onSaveNickName"
      :invalid="isInvalidNickName"
    />
  </div>
</template>

<script>
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import { ref, computed, onBeforeUnmount } from 'vue';

export default {
  components: { Input, Button },
  props: {
    name: String,
  },
  setup(_, { emit }) {
    const nickName = ref(null);
    const isInvalidNickName = computed(
      () => !nickName.value || !nickName.value?.trim()
    );

    const onChangeNickName = (newVal) => (nickName.value = newVal);
    const onSaveNickName = () => emit('onChangeUserName', nickName.value);

    // THIS
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount');
      nickName.value = null;
    });

    return { nickName, isInvalidNickName, onChangeNickName, onSaveNickName };
  },
};
</script>

<style scoped>
.wrapper h1 {
  margin: 0 0 9px;
  font-size: 15px;
}

.wrapper h1:first-child {
  text-decoration: underline;
}

/* .wrapper >>> .button { */
.wrapper:deep() .button {
  width: 200px;
  margin: 15px auto 0;
  padding: 10px;
  font-size: 15px;
}
</style>
