import { ChangeEvent } from 'react';

export interface UpdateTitleInputProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent) => void;
  onConfirm: () => void;
  onCancel: () => void;
}


