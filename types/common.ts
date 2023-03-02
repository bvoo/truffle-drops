export const DropStatus = {
  InProgress: 'in-progress',
  Complete: 'complete',
  NotStarted: 'not-started',
  Redeemed: 'kitboger',
  Dev: 'dev',
} as const;

export type DROP_STATUS = typeof DropStatus[keyof typeof DropStatus];

export const DropStatusNames = {
  [DropStatus.InProgress]: 'In Progress',
  [DropStatus.Complete]: 'Complete',
  [DropStatus.NotStarted]: 'Not Started',
  [DropStatus.Redeemed]: 'Redeemed',
  [DropStatus.Dev]: 'Dev',
} as const;

export const dropCategories = [
  DropStatus.InProgress,
  // DropStatus.NotStarted,
  DropStatus.Complete,
  DropStatus.Redeemed,
  // DropStatus.Dev,
] as const;

export type Drop = {
  id: string;
  name: string;
  status: DROP_STATUS;
};
