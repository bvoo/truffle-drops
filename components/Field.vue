<template>
  <label class="field">
    <span>{{ label }}</span>
    <input :type="type" :min="min" :max="max" v-model="value" />
  </label>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

type FieldProps = {
  type?: InputHTMLAttributes['type'];
  label?: string;
  min?: number | string;
  max?: number | string;
  modelValue?: unknown;
};

const props = defineProps<FieldProps>();
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>

<style lang="scss">
.field {
  @apply flex flex-row gap-4;

  > span {
    @apply font-mono text-right text-secondary tracking-wide w-28 select-none;
  }

  > input {
    @apply bg-secondary rounded h-8 px-2;

    &:focus,
    &:focus-visible {
      @apply outline-true-gray-600;

      outline-style: solid;
      outline-offset: 0;
      outline-width: 1px;
    }
  }
}
</style>
