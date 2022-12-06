import { ReactNode } from 'react';
import { UserResponceModel } from '../../redux/slices/userSlice/interfaces';

export interface TaskUpdateFormModel {
  title: string,
  description: string,
  userId: string,
  users: string[],
}

export interface TaskDetailsPropsModel {
  children?: ReactNode;
  title: string;
  handleDelete: () => void;
  handleUpdate: (arg0: TaskUpdateFormModel) => void;
  description: string;
  users: string[];
  boardUsers: UserResponceModel[];
  userId: string;
  isOwn: boolean;
}
