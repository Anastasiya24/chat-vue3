<template>
  <ChatContainer :name="name">
    <div class="chatContainer">
      <div class="messages">
        <Message
          v-for="message in messages"
          :key="message._id"
          :sender="name"
          :time="message.time"
          :text="message.text"
        />
      </div>
      <div class="textareaFooter">
        <Textarea
          :value="newMessageTest"
          @onSave="sendMessage"
          @onChangeValue="onChangeMessage"
          placeholder="Your message"
        />
        <img
          v-if="isValidMessage"
          :src="sendSvg"
          class="sendIcon"
          @click="sendMessage"
        />
      </div>
    </div>
  </ChatContainer>
</template>

<script>
import { mapGetters, useStore } from 'vuex';
import {
  GET_USER_NAME,
  GET_MESSAGES_LIST,
  ADD_NEW_MESSAGE,
} from '../store/actions.type';

import ChatContainer from '../layouts/ChatContainer';
import Message from '../components/Message';
import Textarea from '../components/Textarea';
import sendSvg from '../assets/icons/send.svg';
import { ref, computed, onMounted } from 'vue';

export default {
  components: { ChatContainer, Message, Textarea },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch(GET_USER_NAME);
      store.dispatch(GET_MESSAGES_LIST);
    });
    const newMessageTest = ref('');

    const isValidMessage = computed(
      () => newMessageTest.value && newMessageTest.value?.trim()
    );

    const onChangeMessage = (value) => (newMessageTest.value = value);

    const sendMessage = () => {
      store.dispatch(ADD_NEW_MESSAGE, newMessageTest.value);
      newMessageTest.value = '';
    };

    return {
      sendSvg,
      newMessageTest,
      isValidMessage,
      onChangeMessage,
      sendMessage,
    };
  },

  computed: {
    // THIS
    ...mapGetters(['name', 'messages']),
  },
};
</script>

<style scoped>
.chatContainer {
  margin: 20px;
}

.messages {
  min-height: calc(100vh - 245px);
}

.textareaFooter {
  display: flex;
}

.sendIcon {
  margin-left: 10px;
  width: 30px;
  filter: invert(30%) sepia(14%) saturate(1269%) hue-rotate(275deg)
    brightness(91%) contrast(89%);
  cursor: pointer;
}

@media (max-width: 600px) {
  .chatContainer {
    margin: 15px;
  }

  .sendIcon {
    margin-left: 6px;
    width: 24px;
  }
}
</style>
