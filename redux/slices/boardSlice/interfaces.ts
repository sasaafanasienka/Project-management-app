export interface BoardModel {
  _id: string;
  title: string;
  owner: string;
  users: Array<string>;
}

export interface InitialStateBoardModel {
  isLoading: boolean;
  boards: BoardModel[];
  error: string,
}

export interface NewBoardPropsModel {
  title: string;
  owner: string;
  users: Array<string>;
}

