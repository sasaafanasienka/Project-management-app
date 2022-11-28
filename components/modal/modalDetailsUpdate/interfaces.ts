import { ReactNode } from 'react';

export interface TaskDetailsPropsModel {
  children?: ReactNode;
  title: string;
  description?: string;
  users: string[];
  onUpdate?: (arg0: BoardModel) => void;
}
