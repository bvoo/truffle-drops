<template>
  <section class="gap-4">
    <h1 class="font-bold font-mono text-lg text-secondary tracking-wide uppercase">Drop Stats</h1>

    <div class="w-full min-w-800px max-h-400px overflow-hidden" v-if="stats">
      <Table :data="mappedData" :columns="columns">
        <div class="flex flex-col gap-2">
          <span class="font-medium text-lg"> {{ drop?.name }} </span>
          <div>
            <div>
              <span> Amount remaining: </span>
              <span>
                <span class="font-semibold">{{ drop?.remaining }}</span> /
                <span class="font-semibold">{{ drop?.quantity }}</span>
              </span>
            </div>
            <div>
              <span> Duration: </span>
              <span class="font-semibold">{{ secondsToHMS(drop?.duration ?? 0) }}</span>
            </div>
          </div>
        </div>
      </Table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { createColumnHelper } from '@tanstack/vue-table';
import dayjs from 'dayjs';
import { DropStatusNames, type DROP_STATUS, type UserResponse } from '~~/types';

const route = useRoute();

const { data: stats } = useFetch(`/api/drops/${route.params['slug']}/stats`);
const { data: drop } = useFetch(`/api/drops/${route.params['slug']}`);

type DropHistory = {
  user: UserResponse | null;
  status: DROP_STATUS;
  created_at: string;
  updated_at: string;
  progress: number;
};

const columnHelper = createColumnHelper<DropHistory>();

const columns = [
  columnHelper.accessor('user', {
    header: 'User',
    cell: (info) => info.getValue()?.name ?? 'unknown',
  }),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => DropStatusNames[info.getValue()],
  }),

  columnHelper.accessor('progress', {
    header: 'Progress',
    cell: (info) => secondsToHMS(info.getValue() ?? 0),
  }),

  columnHelper.accessor('updated_at', {
    header: 'Last Updated',
    cell: (info) => dayjs(new Date(info.getValue()!)).format('MMM D h:mm a'),
  }),
];

const userCache = ref<Map<string, UserResponse>>(new Map());

async function getUser(id: string): Promise<UserResponse | null> {
  if (userCache.value.has(id)) {
    return userCache.value.get(id) ?? null;
  }

  try {
    const res = await fetch(`/api/user/${id}`);

    console.log(res);

    return await res.json();
  } catch (e) {
    console.error('couldnt fetch user ', e);
    return null;
  }
}

const mappedData = ref<DropHistory[]>([]);

watch(
  stats,
  async () => {
    if (!stats.value) return [];

    let promises = stats.value.map(async (x) => {
      const user = await getUser(x.user_id);

      return {
        user,
        status: x.status,
        created_at: x.created_at,
        updated_at: x.updated_at ?? x.created_at,
        progress: x.progress,
      };
    });

    mappedData.value = [
      ...(await Promise.all(promises)),
      {
        created_at: '',
        progress: 32,
        status: 'in-progress',
        updated_at: new Date().toUTCString(),
        user: {
          created_at: '',
          icon: '',
          id: 'swag',
          name: 'Swag',
        },
      },
    ];
  },
  { immediate: true },
);
</script>
