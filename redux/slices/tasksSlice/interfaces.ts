export interface TaskModel {
  _id:string;
  title:string;
  order:number;
  boardId:string;
  columnId:string;
  description:string;
  userId:string;
  users: Array<string>;
}

export interface CreateTaskBodyModel {
  title: string;
  boardid: string;
  description: string;
  users: Array<string>;
}

export interface CreateTaskModel {
  boardId: string,
  columnId: string,
  formData: CreateTaskBodyModel,
}

export interface InitialStateTaskModel {
  isLoading: boolean;
  tasks: TaskModel[];
  error: string,
}

export interface UpdateTaskBodyModel {
  title: string;
  order: number;
}

export interface UpdateTaskModel {
  boardId: string,
  columnId: string,
  taskId: string,
  body: UpdateTaskBodyModel
}

