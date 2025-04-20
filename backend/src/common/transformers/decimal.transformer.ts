import { ValueTransformer } from 'typeorm';

export const decimal: ValueTransformer = {
  to: (entityValue: number): string => entityValue.toString(),
  from: (databaseValue: string): number => parseFloat(databaseValue),
};
