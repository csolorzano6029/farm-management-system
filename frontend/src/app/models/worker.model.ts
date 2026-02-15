export interface Worker {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateWorkerDto {
  firstName: string;
  lastName: string;
}

export interface UpdateWorkerDto {
  firstName?: string;
  lastName?: string;
  active?: boolean;
}
