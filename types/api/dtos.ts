import type { Database } from '../database';

// users
export type UserDto = Database['public']['Tables']['users']['Row'];

// drops
export type DropDto = Database['public']['Tables']['drops']['Row'];

// user_drops
export type UserDropDto = Database['public']['Tables']['user_drops']['Row'];
