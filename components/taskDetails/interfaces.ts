import { ReactNode } from 'react';
import { UserResponceModel } from '../../redux/slices/userSlice/interfaces';

export interface TaskDetailsPropsModel {
  children?: ReactNode;
  title: string;
  handleUpdate: () => void;
  handleDelete: () => void;
  description: string;
  users: string[];
  boardUsers: UserResponceModel[];
  userId: string;
}
