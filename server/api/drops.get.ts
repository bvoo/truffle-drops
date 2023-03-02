import { serverSupabaseClient } from '#supabase/server';
import { dropDtoToResponse, type Database } from '~~/types';
import { getDrops } from '../utils';

// get all drops
// GET api/drops
export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);

  let dropDtos = await getDrops(supabase);

  if (!dropDtos) {
    throw createError({
      statusCode: 500,
      message: 'Failed to get drops',
    });
  }

  return dropDtos.map(dropDtoToResponse);
});
