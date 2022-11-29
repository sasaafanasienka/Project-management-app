export interface TaskModel {
  _id: string;
  title: string;
  order: number;
  boardid: string;
  columnId: string;
  description: string;
  moveTask: any;
  id: string;
  index: number;
  columnIndex: number;
  userId: number;
  users: Array<string>;
}

export interface TaskPropsModel {
  task: TaskModel;
}


