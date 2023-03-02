<script setup lang="ts">
import type { DropResponse, UserDropResponse } from '~~/types';
import { DropStatus, DropStatusNames } from '~~/types/common';

type DropCardProps = {
  drop: DropResponse;
  userDrop?: UserDropResponse;
};

function dropPage() {
  window.location.href = `/dev/stats/${props.drop.id}`;
}

const props = defineProps<DropCardProps>();

const statusName = computed(() => DropStatusNames[props.userDrop?.status || DropStatus.NotStarted]);

const hasProgress = computed(() => props.userDrop?.status == DropStatus.InProgress);

const hasOverlay = computed(
  () =>
    props.userDrop?.status == DropStatus.NotStarted ||
    props.userDrop?.status == DropStatus.Redeemed ||
    props.userDrop?.status == DropStatus.Complete,
);

const completed = computed(() => props.userDrop?.status == DropStatus.Complete);

const redeemed = computed(() => props.userDrop?.status == DropStatus.Redeemed);

const dev = computed(() => props.userDrop?.status == DropStatus.Dev);

const imageUrl = computed(() => (props.drop.image == '' ? 'http://a' : props.drop.image));

const time = computed(() => {
  let progress = props.userDrop?.progress ?? 0;
  let progressLabel = secondsToHMS(progress);
  let total = props.drop.duration;
  let totalLabel = secondsToHMS(total);

  return {
    progress,
    progressLabel,
    total,
    totalLabel,
  };
});

const isLoading = ref(false);

const user = useTruffleUser();

function handleError(error: unknown) {
  isLoading.value = false;

  console.error('failed to redeem', error);
}

async function redeem() {
  try {
    isLoading.value = true;
    const res = await fetch(`/api/drops/user/${user.value.id}/redeem/${props.drop.id}`, {
      method: 'post',
      body: '',
    });

    if (res.status < 200 || res.status > 299) {
      handleError(res);
      return;
    }

    isLoading.value = false;
    if (props.userDrop) {
      props.userDrop.status = 'kitboger';
    }
  } catch (e) {
    isLoading.value = false;
    handleError(e);
  }
}
</script>

<template>
  <div class="drop-card">
    <div class="drop-card-upper">
      <div>
        <span>{{ drop.name }}</span>
      </div>

      <object :data="imageUrl" type="image/png">
        <div>
          <Icon name="lucide:file-warning" size="28" />
        </div>
      </object>
    </div>

    <Progress
      v-if="hasProgress"
      :value="(time.progress / time.total) * 100"
      :labels="[time.progressLabel, time.totalLabel]"
    />

    <div v-if="hasOverlay" class="drop-card-overlay overlay">
      <div>
        <span>{{ statusName }}</span>
      </div>
      <button v-if="completed" @click="redeem">
        <span>Claim</span>
        <Icon v-if="isLoading" name="lucide:rotate-cw" class="ml-2 animate-spin" />
      </button>
    </div>

    <div v-if="dev">
      <button @click="dropPage">View Statistics</button>
    </div>
  </div>
</template>

<style lang="scss">
.drop-card {
  @apply bg-secondary rounded-md flex flex-col shadow-lg p-3 w-200px gap-2 relative items-center justify-between overflow-hidden select-none;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.drop-card-upper {
  @apply flex flex-col w-full gap-2 items-center;

  > object {
    @apply rounded-md flex max-h-140px aspect-square overflow-hidden;

    > div {
      @apply bg-tertiary flex h-140px w-140px items-center justify-center;
    }
  }

  > div {
    @apply h-12 w-full;

    > span {
      @apply font-mono font-bold text-left text-secondary tracking-wide uppercase;
    }
  }
}

.drop-card-overlay {
  @apply flex flex-col bg-opacity-60 py-4 gap-4 items-center justify-center;
  background-color: hsla(0, 0%, 85%, 0.6);

  > div {
    @apply flex flex-row h-full items-center;

    > span {
      @apply font-mono font-bold text-xl tracking-wide p-4 uppercase;
    }
  }
}

.dark .drop-card-overlay {
  background-color: hsla(250, 24%, 9%, 85%);
}
</style>
