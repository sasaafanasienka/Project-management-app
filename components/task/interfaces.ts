export interface TaskPropsModel {
  title: string;
  description: string;
  id: string;
  columnId: string;
  userId: string;
  users: string[];
  boardId: string;
  order: number;
  index: number;
}

export interface TaskModel {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  moveTask: any;
  id: string;
  index: number;
  columnIndex: number;
  userId: number;
  users: Array<string>;
}

