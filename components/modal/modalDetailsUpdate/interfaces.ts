import { ReactNode } from 'react';
import { BoardModel } from '../../../redux/slices/boardSlice/interfaces';

export interface TaskDetailsPropsModel {
  children?: ReactNode;
  title: string;
  description?: string;
  users: string[];
  onUpdate?: (arg0: BoardModel) => void;
}
