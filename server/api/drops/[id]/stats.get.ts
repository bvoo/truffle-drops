import { serverSupabaseClient } from '#supabase/server';
import { getDropStats } from '~~/server/utils';
import { Database, statsDtoToStatsResponse } from '~~/types';

// get dev stats for drop
// GET /api/drops/:id/stats
export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 500,
    });
  }

  const supabase = serverSupabaseClient<Database>(event);

  const stats = await getDropStats(supabase, id);

  if (!stats) {
    throw createError({
      statusCode: 404,
    });
  }

  return stats.map(statsDtoToStatsResponse);
});
