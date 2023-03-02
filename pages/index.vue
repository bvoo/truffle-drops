<script setup lang="ts">
import type { DropResponse, UserDropResponse } from '~~/types';
import { dropCategories, DropStatus, DropStatusNames } from '~~/types/common';

const user = useTruffleUser();

const { data: drops } = await useFetch('/api/drops');

const { data: userDrops } = await useFetch(() => `/api/drops/user/${user.value.id}`);

const statuses = [DropStatus.InProgress, DropStatus.Complete, DropStatus.Redeemed];

const sortedDrops = computed(() => {
  const arrays: { [key: string]: UserDropResponse[] } = {
    [DropStatus.InProgress]: [],
    [DropStatus.Complete]: [],
    [DropStatus.Redeemed]: [],
    // [DropStatus.Dev]: [],
  };

  if (drops.value) {
    for (const dropr of drops.value) {
      const drop: UserDropResponse = {
        drop: dropr,
        created_at: '',
        updated_at: '',
        status: statuses[Math.floor(Math.random() * 2)],
        user_id: 'user',
        progress: Math.floor(Math.random() * dropr.duration),
      };

      arrays[drop.status].push(drop);
    }
  }

  return arrays;
});

const notStartedDrops = ref([]);

// const notStartedDrops = computed(() => {
//   const temp: DropResponse[] = [];

//   if (drops.value) {
//     if (!userDrops.value) {
//       return drops.value;
//     }

//     for (const drop of drops.value) {
//       if (Math.random() > 0.5) {
//         if (!userDrops.value.find((x) => x.drop.id == drop.id)) {
//           temp.push(drop);
//         }
//       }
//     }
//   }

//   return temp;
// });
</script>

<template>
  <section class="w-400px gap-8 sm:w-600px lg:w-800px">
    <div v-for="category in dropCategories" :key="category" class="flex flex-col gap-4">
      <span class="font-bold font-mono text-lg text-secondary tracking-wide uppercase">
        {{ DropStatusNames[category] }}
      </span>
      <div class="flex flex-row flex-wrap gap-4 justify-center">
        <DropCard v-for="drop in sortedDrops[category]" :drop="drop.drop" :user-drop="drop" :key="drop.drop.id" />
      </div>
    </div>
    <!-- <div class="flex flex-col pb-4 gap-4">
      <span class="font-bold font-mono text-lg text-secondary tracking-wide uppercase">Not Started</span>
      <div class="flex flex-row flex-wrap gap-4 justify-center">
        <DropCard v-for="drop in notStartedDrops" :drop="drop" :key="drop.id" />
      </div>
    </div> -->
  </section>
</template>
