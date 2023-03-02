<script setup lang="ts">
import { getSrcByImageObj } from '@trufflehq/sdk';

const DEFAULT_IMAGE = 'http://a';

const user = useTruffleUser();

const avatarUrl = computed(() => {
  if (user.value.id != 'user' && user.value.avatarImage?.cdn) {
    return getSrcByImageObj(user.value.avatarImage, { size: 'small' });
  }

  return DEFAULT_IMAGE;
});
</script>

<template>
  <div class="flex flex-row gap-2 items-center">
    <span>{{ user.name }}</span>

    <object :data="avatarUrl" type="image/png" class="rounded-full h-10 w-10">
      <div class="placeholder-image"></div>
    </object>
  </div>
</template>
