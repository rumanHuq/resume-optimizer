import type { Maybe } from '@/@types/@types';

export const ensureValueIsTruthy = <T extends Record<string, unknown>>(value: Maybe<T>): value is T => {
  if (value === null || value === undefined) return false;

  if (typeof value === 'number' && Number.isNaN(value)) return false;

  return true;
};
