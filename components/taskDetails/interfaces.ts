import { ReactNode } from 'react';
import { TaskModel } from '../task/interfaces';

export interface TaskDetailsPropsModel {
  children?: ReactNode;
  task: TaskModel;
}
