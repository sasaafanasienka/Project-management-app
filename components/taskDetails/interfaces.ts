import { ReactNode } from 'react';

export interface TaskDetailsPropsModel {
  children?: ReactNode;
  title: string;
  description: string;
  users: string[];
}
