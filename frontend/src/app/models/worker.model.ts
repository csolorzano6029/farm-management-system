export interface WorkerModel {
  id: string;
  firstName: string;
  lastName: string;
  active: boolean;
  role?: string;
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
