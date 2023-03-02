import { getUserDrop, redeemDrop } from '~~/server/utils';
import { Database, DROP_STATUS } from '~~/types';
import { serverSupabaseClient } from '#supabase/server';

// user redeem drop by id
export default defineEventHandler(async (event) => {
  const userId = event.context.params?.userId;
  const dropId = event.context.params?.id;

  if (!userId || !dropId) {
    throw createError({
      statusCode: 500,
    });
  }

  const supabase = serverSupabaseClient<Database>(event);

  const existingDrop = await getUserDrop(supabase, userId, dropId);

  if (!existingDrop) {
    throw createError({
      statusCode: 404,
    });
  }

  if ((existingDrop?.status as DROP_STATUS) != 'complete') {
    throw createError({
      statusCode: 400,
      statusMessage: 'drop cannot be redeemed yet',
    });
  }

  await redeemDrop(supabase, userId, dropId);

  event.node.res.statusCode = 200;

  return {};
});
