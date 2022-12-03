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

export interface InitialStateTaskModel {
  isLoading: boolean;
  tasks: TaskModel[];
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
}

