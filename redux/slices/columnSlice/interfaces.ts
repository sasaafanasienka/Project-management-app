export interface ColumnModel {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface InitialStateColumnModel {
  status: string,
  isLoading: boolean;
  columns: ColumnModel[];
  error: string,
}

export interface NewColumnPropsModel {
  title: string;
  owner: string;
  users: Array<string>;
}

