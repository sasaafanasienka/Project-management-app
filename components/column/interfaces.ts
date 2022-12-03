import { TaskPropsModel } from '../task/interfaces';

export interface ColumnPropsModel {
  title: string;
  index: number;
  id: string;
  tasks: TaskPropsModel;
  boardId: string;
}


