export interface TaskModel {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: Array<string>;
}

export interface TaskPropsModel {
  task: TaskModel;
}


