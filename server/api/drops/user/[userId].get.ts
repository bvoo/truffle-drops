import { serverSupabaseClient } from '#supabase/server';
import { getDrop, getUserDrops, notNull } from '~~/server/utils';
import { userDropDtoToUserDropResponse, type Database, type UserDropResponse } from '~~/types';

// get drops for user
// GET api/drops/user/:userId
export default defineEventHandler(async (event) => {
  const userId = event.context.params?.userId;

  if (!userId) {
    throw createError({
      statusCode: 500,
    });
  }

  const supabase = serverSupabaseClient<Database>(event);

  let userDrops = await getUserDrops(supabase, userId);

  if (!userDrops) {
    throw createError({
      statusCode: 404,
    });
  }

  const userDropsResponse = await Promise.all(
    userDrops.map(async (x) => {
      const drop = await getDrop(supabase, x.drop_id);

      if (!drop) return null;

      return userDropDtoToUserDropResponse(x, drop);
    }),
  );

  return userDropsResponse.filter(notNull) as UserDropResponse[];
});
