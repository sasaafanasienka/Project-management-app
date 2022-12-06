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
  formData: CreateTaskBodyModel
}

export interface BoardTasksModel {
  [K: string]: TaskModel[]
}

export interface InitialStateTaskModel {
  isLoading: boolean;
  tasks: TaskModel[];
  boardTasks: BoardTasksModel;
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

export interface UpdateTaskPropsModel {
  title: string;
  order: number;
  description: string;
}

export interface UpdateTaskPropsModelFull {
  title: string,
  order: number,
  description: string,
  columnId: string,
  userId: string,
  users: string[]
}

