<template>
  <div class="app">
    <Nav />
    <OverlayScrollbarsComponent defer element="main" :options="{ overflow: { x: 'hidden', y: 'scroll' } }">
      <div class="flex flex-col h-full px-4 pb-8">
        <NuxtPage />
      </div>
    </OverlayScrollbarsComponent>
  </div>
</template>

<script setup lang="ts">
import { getSrcByImageObj, TruffleImage } from '@trufflehq/sdk';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';

const user = useTruffleUser();

function getImage(avatarImage: TruffleImage) {
  try {
    return getSrcByImageObj(avatarImage);
  } catch {
    return null;
  }
}

onMounted(() => {
  fetch(`/api/user`, {
    method: 'POST',
    body: JSON.stringify({
      id: user.value.id,
      name: user.value.name,
      image: getImage(user.value.avatarImage),
    }),
  });

  function heartbeat() {
    fetch(`/api/drops/user/${user.value.id}/heartbeat`, {
      method: 'POST',
      body: '',
    });
  }

  // heartbeat 15s
  setInterval(heartbeat, 15000);
});
</script>
