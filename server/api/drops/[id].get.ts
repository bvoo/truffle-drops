import { serverSupabaseClient } from '#supabase/server';
import { getDrop } from '~~/server/utils';
import { type Database } from '~~/types';

// get drop by id
// GET api/drops/:id
export default defineEventHandler(async (event) => {
  const dropId = event.context.params?.id;

  if (!dropId) {
    throw createError({
      statusCode: 500,
    });
  }

  const parsedId = Number.parseInt(dropId);

  if (isNaN(parsedId)) {
    throw createError({
      statusCode: 400,
      statusMessage: `\`${dropId}\` is not a valid id`,
    });
  }

  const supabase = serverSupabaseClient<Database>(event);

  let drop = await getDrop(supabase, parsedId);

  if (!drop) {
    throw createError({
      statusCode: 404,
    });
  }

  return drop;
});
