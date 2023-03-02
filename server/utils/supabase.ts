import { SupabaseClient } from '@supabase/supabase-js';
import type { Database, DropDto, DropRequest, UserDropDto, UserDto, UserRequest } from '~~/types';
import { DropStatus } from '~~/types';

export async function getDrops(supabase: SupabaseClient<Database>): Promise<DropDto[] | null> {
  const { data, error } = await supabase.from('drops').select();

  if (error) {
    console.error('supabase error:', error);
    return null;
  }

  return data;
}

export async function createDrop(
  supabase: SupabaseClient<Database>,
  dropRequest: DropRequest,
): Promise<DropDto | null> {
  const { data, error } = await supabase
    .from('drops')
    .insert({ ...dropRequest })
    .select();

  // check for error :)
  if (error) {
    console.error('supabase error:', error);
    return null;
  }

  return data[0];
}

export async function getDrop(supabase: SupabaseClient<Database>, id: number) {
  const { data, error } = await supabase //
    .from('drops')
    .select('*')
    .eq('id', id);

  // doesn't exist
  if (error) {
    return null;
  }

  return data[0];
}

export async function getUserDrop(
  supabase: SupabaseClient<Database>,
  userId: string,
  dropId: string,
): Promise<UserDropDto | null> {
  const { data, error } = await supabase //
    .from('user_drops')
    .select('*')
    .eq('user_id', userId)
    .eq('drop_id', dropId);

  // doesn't exist
  if (error) {
    return null;
  }

  return data[0];
}

export async function redeemDrop(supabase: SupabaseClient<Database>, userId: string, dropId: string) {
  const { error } = await supabase
    .from('user_drops')
    .update({ status: DropStatus.Redeemed })
    .eq('user_id', userId)
    .eq('drop_id', dropId);

  if (error) {
    return false;
  }

  return true;
}

export async function getDropStats(supabase: SupabaseClient<Database>, dropId: string): Promise<UserDropDto[] | null> {
  const { data, error } = await supabase //
    .from('user_drops')
    .select()
    .eq('drop_id', dropId);

  if (error) {
    console.error('supabase error:', error);
    return null;
  }

  return data;
}

export async function getUserDrops(supabase: SupabaseClient<Database>, userId: string): Promise<UserDropDto[] | null> {
  const { data, error } = await supabase //
    .from('user_drops')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('supabase error:', error);
    return null;
  }

  return data;
}

export async function tickUserDrops(supabase: SupabaseClient<Database>, userId: string) {
  let { error } = await supabase.rpc('tick_user_drops', { p_user_id: userId });

  if (error) {
    console.error('supabase error:', error);
    return false;
  }

  return true;
}

export async function getUser(supabase: SupabaseClient<Database>, userId: string): Promise<UserDto | null> {
  const { data, error } = await supabase //
    .from('users')
    .select('*')
    .limit(1)
    .eq('id', userId)
    .single();

  if (error) {
    console.error('supabase error:', error);
    return null;
  }

  return data;
}

export async function updateUser(supabase: SupabaseClient<Database>, user: UserRequest): Promise<null> {
  const { error } = await supabase //
    .from('users')
    .upsert(user)
    .select();

  if (error) {
    console.error('supabase error:', error);
    return null;
  }

  return null;
}
