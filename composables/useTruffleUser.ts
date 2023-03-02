import { TruffleUser, user } from '@trufflehq/sdk';

const DEFAULT_USER: TruffleUser = {
  avatarImage: { aspectRatio: null!, cdn: null!, ext: null!, prefix: null!, variations: null! },
  id: 'user',
  name: 'user',
};

export default function useTruffleUser() {
  const userRef = ref<TruffleUser>(DEFAULT_USER);

  user.observable.subscribe({
    // @ts-expect-error
    next(user: TruffleUser) {
      if (!user?.name) {
        userRef.value = DEFAULT_USER;
        return;
      }

      userRef.value = user;
    },
    error(err: unknown) {
      console.error(err);
    },
    complete() {
      //
    },
  });

  return userRef;
}
