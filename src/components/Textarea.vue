<template>
  <textarea
    :value="value"
    @input="(event) => onChangeValue(event.target.value)"
    :class="$style.textarea"
    :placeholder="placeholder"
    v-on:keyup.enter="onKeyPress"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const onKeyPress = () => {
      if (props.value?.trim()) {
        emit('onSave', props.value);
      }
    };

    const onChangeValue = (newVal) => {
      emit('onChangeValue', newVal);
    };

    return { onKeyPress, onChangeValue };
  },
};
</script>

<style module>
.textarea {
  box-sizing: border-box;
  height: 80px;
  width: 100%;
  border: 1px solid #d8d8d8;
  resize: none;
  line-height: 19px;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 15px;
  border-radius: 10px;
}

.textarea::placeholder {
  color: #a9a8a7;
  font-size: 17px;
  line-height: 19px;
}
</style>
