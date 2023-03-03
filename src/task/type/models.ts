export interface CreateTaskTypeDTO {
  projectId: number;
  name: string;
  description: string;
}

export interface UpdateTaskTypeDTO {
  id: number;
  name: string;
  description: string;
}
