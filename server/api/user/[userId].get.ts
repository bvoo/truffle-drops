import { serverSupabaseClient } from '#supabase/server';
import { userDtoToUserResponse, type Database } from '~~/types';
import { getUser } from '../../utils';

// get user by id
// GET api/user/:userId
export default defineEventHandler(async (event) => {
  const userId = event.context.params?.userId;

  if (!userId) {
    throw createError({
      statusCode: 500,
    });
  }

  const supabase = serverSupabaseClient<Database>(event);

  let userDto = await getUser(supabase, userId);

  if (!userDto) {
    throw createError({
      statusCode: 404,
    });
  }

  return userDtoToUserResponse(userDto);
});
