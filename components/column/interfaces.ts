import { ReactNode } from 'react';
import { TaskPropsModel } from '../task/interfaces';

export interface ColumnPropsModel {
  title: string;
  ref?: ReactNode;
  index: number;
  moveColumn?: any;
  moveTask?: any;
  id: string;
  tasks: TaskPropsModel;
  onDragOver: any;
  onDragLeave: any;
  onDragStart: any;
  onDragEnd: any;
  onDrop: any;
}


