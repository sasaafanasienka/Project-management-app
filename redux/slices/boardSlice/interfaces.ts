export interface BoardModel {
  _id: string;
  title: string;
  owner: string;
  users: Array<string>;
}

export interface BoardUserModel extends BoardModel{
  invited: boolean;
}

export interface InitialStateBoardModel {
  isLoading: boolean;
  boards: BoardUserModel[];
  error: string,
}

export interface NewBoardPropsModel {
  title: string;
  owner: string;
  users: Array<string>;
}

