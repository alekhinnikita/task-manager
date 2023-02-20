export interface CreateProjectDTO {
  name: string;
  headId: number;
  code: string;
  description: string;
}

export interface UpdateProjectDTO {
  projectId: number;
  name?: string;
  headId?: number;
  //code?: string; будет изменять код всех задач
  description?: string;
}
