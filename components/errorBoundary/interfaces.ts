import { ReactNode } from 'react';

export interface ErrorBoundaryPropsModel {
  children?: ReactNode;
}

export interface ErrorBoundaryStateModel {
  hasError: boolean;
}
