<template>
  <nav class="flex flex-row h-$navbar-height w-full px-4 items-center justify-between lg:max-w-1200px">
    <a class="text-xl" href="/">{{ user.name }} - Truffle Drops</a>

    <div class="flex flex-row gap-4 items-center select-none">
      <Icon name="lucide:plus" @click="goCreate" class="cursor-pointer" size="24px"></Icon>
      <Icon :name="icon" @click="toggleTheme" class="cursor-pointer" size="20px" />
      <UserCard />
    </div>
  </nav>
</template>

<script setup lang="ts">
const user = useTruffleUser();

const mode = useColorMode();

function toggleTheme() {
  switch (mode.preference) {
    case 'light':
      mode.preference = 'dark';
      break;
    case 'dark':
      mode.preference = 'light';
      break;
    default:
      mode.preference = 'dark';
      break;
  }
}

const icon = computed(() => {
  switch (mode.preference) {
    case 'light':
      return 'lucide:sun';
    case 'dark':
      return 'lucide:moon';
    default:
      return 'lucide:cloud-sun';
  }
});

function goCreate() {
  navigateTo('/dev/create');
}
</script>
