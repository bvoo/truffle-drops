<template>
  <section class="h-full gap-4 justify-center">
    <h1 class="font-bold font-mono text-lg text-secondary tracking-wide uppercase">Create Drop</h1>
    <div
      class="bg-semi-primary rounded-lg flex flex-col-reverse p-4 gap-8 items-center sm:(flex-row items-start) lg:w-621px "
    >
      <div v-if="!isCreated" class="flex flex-col w-full gap-4 justify-between">
        <form class="flex flex-col gap-2">
          <Field type="text" label="name" v-model="dropName" />
          <Field type="text" label="image url" v-model="dropImage" />
          <Field type="text" label="webhook url" v-model="dropWebhook" />
          <Field type="number" min="1" label="quantity" v-model="dropQuantity" />
          <Field type="number" min="1" label="duration" v-model="dropDuration" />
        </form>
        <div v-if="isError" class="text-center w-full text-red-500">
          <span>Failed to create drop</span>
        </div>

        <button type="submit" @click="submit" :disabled="!isValid" :class="isValid ? '' : 'invalid'">
          <span>Submit</span>
          <Icon v-if="isLoading" name="lucide:rotate-cw" class="ml-2 animate-spin" />
        </button>
      </div>
      <div
        v-else
        class="rounded-lg flex flex-col w-full gap-4 gap-2 duration-150 overflow-hidden items-center justify-center"
      >
        <h1 class="text-4xl text-green-500">Created!</h1>
        <span class="text-secondary">Redirecting to home page</span>
      </div>
      <div class="preview">
        <DropCard :drop="preview" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DropRequest, DropResponse, validateDropRequest } from '~~/types';

const isError = ref(false);
const isCreated = ref(false);
const isLoading = ref(false);

const dropImage = ref('');
const dropName = ref('');
const dropWebhook = ref('');
const dropQuantity = ref(0);
const dropDuration = ref(0);

const DEFAULT_IMAGE = 'http://a';

const preview = computed<DropResponse>(() => ({
  createdAt: '',
  duration: dropDuration.value,
  id: 0,
  image: valueOrDefault(dropImage.value, DEFAULT_IMAGE),
  name: valueOrDefault(dropName.value, 'None'),
  quantity: dropQuantity.value,
  remaining: dropQuantity.value,
  webhook: dropWebhook.value,
}));

function submit(e: Event) {
  e.preventDefault();

  if (isLoading.value || isCreated.value) {
    return;
  }

  createDrop();
}

function valueOrDefault(value: string, defaultValue: string) {
  let trimmed = value.trim();

  return trimmed == '' ? defaultValue : trimmed;
}

const request = computed<DropRequest>(() => ({
  name: dropName.value,
  image: dropImage.value,
  quantity: dropQuantity.value,
  duration: dropDuration.value,
  remaining: dropQuantity.value,
  webhook: dropWebhook.value,
}));

const isValid = computed(() => validateDropRequest(request.value));

async function createDrop() {
  if (!validateDropRequest(request.value)) return;

  console.log('using req', request.value);

  isLoading.value = true;

  try {
    const res = await fetch('/api/drops', {
      method: 'post',
      body: JSON.stringify(request.value),
    });

    if (res.status < 200 || res.status > 299) {
      handleError(res);
      return;
    }

    isError.value = false;
    isCreated.value = true;
    isLoading.value = false;

    console.log('created drop', res);

    setTimeout(() => {
      navigateTo('/');
    }, 2000);
  } catch (e) {
    handleError(e);
  }
}

function handleError(e: unknown) {
  isError.value = true;

  isLoading.value = false;

  console.error('create drop error', e);
}
</script>

<style lang="scss">
button:disabled.invalid {
  @apply text-true-gray-600 !bg-secondary dark:text-true-gray-400;
  background-image: none;
}
</style>
