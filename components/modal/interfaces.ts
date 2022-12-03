import { ReactNode } from 'react';

export interface ModalWindowPropsModel {
  title: string | ReactNode;
  description?: string;
  children: ReactNode;
  isOpened: boolean;
}

export type ModalWindowStateModel = boolean;
