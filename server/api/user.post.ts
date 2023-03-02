import { serverSupabaseClient } from '#supabase/server';
import { DropRequest, type Database, type UserRequest } from '~~/types';
import { updateUser } from '../utils';

// create or update user by id
// POST api/user
export default defineEventHandler(async (event) => {
  const body: UserRequest = await readBody(event);

  if (!body.name) {
    throw createError({
      statusCode: 400,
    });
  }

  const supabase = serverSupabaseClient<Database>(event);

  await updateUser(supabase, body);

  return {};
});
