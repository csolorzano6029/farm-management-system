import { ValueTransformer } from 'typeorm';

export const date: ValueTransformer = {
  to: (entityValue: string | Date): Date => {
    // Asegura que lo que se guarda en la base sea un objeto Date
    return new Date(entityValue);
  },
  from: (databaseValue: Date): string => {
    // Convierte el valor que viene de la DB a 'YYYY-MM-DD'
    return databaseValue.toISOString().split('T')[0];
  },
};
