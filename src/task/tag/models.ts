export interface CreateTaskTagDTO {
  projectId: number;
  name: string;
  description: string;
}

export interface UpdateTaskTagDTO {
  id: number;
  name: string;
  description: string;
}
