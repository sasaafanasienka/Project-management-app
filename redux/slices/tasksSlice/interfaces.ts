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

export interface BoardTasksModel {
  [K: string]: TaskModel[]
}

export interface InitialStateTaskModel {
  isLoading: boolean;
  tasks: TaskModel[];
  boardTasks: BoardTasksModel;
  error: string,
}

export interface NewTaskPropsModel {
  title: string;
  boardid: string;
  // owner: string;
  // users: Array<string>;
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

