import { CreateTaskBodyModel } from '../../redux/slices/tasksSlice/interfaces';

export interface NewBoardFormProps {
  onSubmit: (_arg0: CreateTaskBodyModel) => void;
  onClose: () => void;
  boardId: string;
}
