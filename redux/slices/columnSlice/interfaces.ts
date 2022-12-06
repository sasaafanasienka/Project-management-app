export interface ColumnModel {
  _id: string;
  title: string;
  order: number;
  boardId: string | string[] | undefined;
}

export interface InitialStateColumnModel {
  status: string,
  isLoading: boolean;
  columns: ColumnModel[];
  error: string,
}

export interface NewColumnPropsModel {
  title: string;
  boardId: string;
}

export interface UpdateColumnPropsModel {
  title?: string;
  order?: number;
}

export interface UpdateColumnModel {
  boardId: string;
  columnId: string;
  body: UpdateColumnPropsModel
}

export interface DeleteColumnModel {
  boardId: string,
  columnId: string
}

