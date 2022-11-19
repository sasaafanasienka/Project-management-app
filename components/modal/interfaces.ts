import { ReactNode } from 'react';

export interface ModalWindowPropsModel {
  title: string;
  description?: string;
  children: ReactNode;
  isOpened: boolean;
  closeFunc: () => void;
}

export type ModalWindowStateModel = boolean;
