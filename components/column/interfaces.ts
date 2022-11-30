import { ReactNode } from 'react';
import { TaskModel, TaskPropsModel } from '../task/interfaces';

export interface ColumnPropsModel {
  title: string;
  id: string;
  tasks: TaskModel[];
}


