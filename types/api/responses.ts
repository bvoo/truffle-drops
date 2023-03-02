import type { DROP_STATUS } from '../common';
import { DropDto, UserDropDto, UserDto } from './dtos';

export type UserReponse = {
  id: string;
  name: string;
  icon: string;
  drops: DropResponse[];
};

export type DropResponse = {
  id: number;
  name: string;
  image: string;
  webhook: string;
  duration: number;
  quantity: number;
  remaining: number;
  createdAt: string;
};

export function dropDtoToResponse(dto: DropDto): DropResponse {
  return {
    id: dto.id,
    name: dto.name,
    image: dto.image,
    webhook: dto.webhook,
    duration: dto.duration,
    quantity: dto.quantity,
    remaining: dto.remaining,
    createdAt: dto.created_at,
  };
}

export type StatsResponse = {
  totalDrops: number;
  totalDropsCompleted: number;
  users: UserStat[];
};

type UserStat = {
  id: string;
  redeemed: boolean;
  timestamp: string;
};

export type UserDropResponse = {
  user_id: string;
  drop: DropResponse;
  progress: number;
  status: DROP_STATUS;
  created_at: string;
  updated_at: string | null;
};

export function userDropDtoToUserDropResponse(dto: UserDropDto, dropDto: DropDto): UserDropResponse {
  return {
    user_id: dto.user_id,
    progress: dto.progress,
    status: dto.status as DROP_STATUS,
    created_at: dto.created_at,
    updated_at: dto.updated_at,
    drop: dropDtoToResponse(dropDto),
  };
}

export type UserResponse = {
  id: string;
  name: string;
  icon: string | null;
  created_at: string;
};

export function userDtoToUserResponse(dto: UserDto): UserResponse {
  return {
    id: dto.id,
    name: dto.name,
    icon: dto.icon,
    created_at: dto.created_at,
  };
}

export type DropStatsResponse = {
  user_id: string;
  progress: number;
  status: DROP_STATUS;
  created_at: string;
  updated_at: string | null;
};

export function statsDtoToStatsResponse(dto: UserDropDto): DropStatsResponse {
  return {
    user_id: dto.user_id,
    progress: dto.progress,
    status: dto.status as DROP_STATUS,
    created_at: dto.created_at,
    updated_at: dto.updated_at,
  };
}
