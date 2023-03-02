<template>
  <div class="progress" :style="`--progress-value: ${value}%`">
    <div v-if="labels">
      <div>
        <span v-for="(content, i) of labels" :key="i">{{ content }}</span>
      </div>
      <div>
        <span v-for="(content, i) of labels" :key="i">{{ content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ value: number; labels?: [string, string] }>();
</script>

<style lang="scss">
.progress {
  @apply bg-black rounded flex flex-row bg-opacity-10 w-full relative items-center overflow-hidden;
  height: 36px;
  @apply isolate;

  > div {
    @apply flex h-full w-full relative;
    > div {
      @apply top-0 bottom-0 absolute;

      @apply flex flex-row font-mono font-bold text-sm tracking-wide w-full z-10 items-center justify-between;

      > span {
        @apply px-2;
      }
    }

    > div:first-child {
      @apply text-dark-400 z-3;

      clip-path: polygon(0 0, var(--progress-value) 0, var(--progress-value) 100%, 0 100%);
    }

    > div:last-child {
      @apply text-primary z-1;
    }
  }

  &::before,
  &::after {
    @apply transition-all top-0 bottom-0 absolute;
    content: '';
  }

  &::before {
    --tw-gradient-stops: var(--gradient-from), var(--gradient-to, rgba(255, 255, 255, 0));

    @apply bg-gradient-to-r w-$progress-value left-0 z-2;
  }

  &::after {
    @apply bg-secondary bg-[#adaeb1] right-0 z-0 dark:bg-[#1a1a1a];

    width: calc(100% - var(--progress-value));
  }
}
</style>
