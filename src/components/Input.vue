<template>
  <div class="input">
    <input
      type="text"
      :value="value"
      @input="(event) => onChangeValue(event.target.value)"
      v-on:keyup.enter="onKeyPress"
      class="effect"
      :placeholder="placeholder"
    />
    <span class="border">
      <i />
    </span>
  </div>
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

<style scoped>
.input {
  position: relative;
}

.effect[type='text'] {
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}

.effect {
  border: 1px solid #ccc;
  padding: 7px 14px 9px;
  transition: 0.4s;
}

.effect ~ .border:before,
.effect ~ .border:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--dark-color);
  transition: 0.3s;
}

.effect ~ .border:after {
  top: auto;
  bottom: 0;
  left: auto;
  right: 0;
}

.effect ~ .border i:before,
.effect ~ .border i:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 0;
  background-color: var(--dark-color);
  transition: 0.4s;
}

.effect ~ .border i:after {
  left: auto;
  right: 0;
  top: auto;
  bottom: 0;
}

.effect:focus ~ .border:before,
.effect:focus ~ .border:after {
  width: 100%;
  transition: 0.3s;
}

.effect:focus ~ .border i:before,
.effect:focus ~ .border i:after {
  height: 100%;
  transition: 0.4s;
}
</style>
