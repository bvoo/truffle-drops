import { serverSupabaseClient } from '#supabase/server';
import { createDrop } from '~~/server/utils';
import { dropDtoToResponse, validateDropRequest, type Database, type DropRequest, type DropResponse } from '~~/types';

// create drop
// POST api/drops
export default defineEventHandler(async (event) => {
  const body: DropRequest = await readBody(event);

  if (!validateDropRequest(body)) {
    console.log(body, 'is invalid for some fucking reason');

    throw createError({
      statusCode: 400,
    });
  }

  const supabase = serverSupabaseClient<Database>(event);

  let dto = await createDrop(supabase, body);

  if (!dto) {
    throw createError({
      statusCode: 500,
      message: 'Failed to create drop',
    });
  }

  let res: DropResponse = dropDtoToResponse(dto);

  event.node.res.statusCode = 201;

  return res;
});
