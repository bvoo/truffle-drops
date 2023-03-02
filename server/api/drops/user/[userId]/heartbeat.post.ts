import { serverSupabaseClient } from '#supabase/server';
import { tickUserDrops } from '~~/server/utils';
import { type Database } from '~~/types';

// add time to users drop progress
// POST api/drops/user/:userId/heartbeat
export default defineEventHandler(async (event) => {
  const userId = event.context.params?.userId;

  if (!userId) {
    throw createError({
      statusCode: 500,
    });
  }

  const supabase = serverSupabaseClient<Database>(event);

  const updated = await tickUserDrops(supabase, userId);

  if (!updated) {
    throw createError({
      statusCode: 500,
    });
  }
});
