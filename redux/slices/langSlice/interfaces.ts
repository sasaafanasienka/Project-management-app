// eslint-disable-next-line no-shadow
export enum LangOption {
  EN = 'EN',
  RU = 'RU',
}

export interface LangLayoutModel {
  lang: string;
  author1: string;
  author2: string;
  homeTitle: string;
  homeDescription: string;
  teamTitle: string;
  technologiesTitle: string;
  homeBtn: string;
  navProfile: string;
  navBoards: string;
  singIn: string;
  singUp: string;
  register: string;
  noAccount: string;
  hasAccount: string;
  name: string;
  login: string;
  password: string;
  addBoardBtn: string;
  addColumnBtn: string;
  addTaskBtn: string;
  createBoardHeader: string;
  createTaskHeader: string;
  createColumnHeader: string;
  createNewFormTitle: string;
  createNewFormDescr: string;
  addBtn: string;
  confirmBtn: string;
  cancelBtn: string;
  deleteBtn: string;
  changeUser: string;
  assignTo: string;
  confirmation: string;
  deleteColumn: string;
  deleteTask: string;
  deleteBoard: string;
  successCreated: string;
  successDeleted: string;
  editProfile: string,
}

export interface InitialStateModel {
  currentLang: LangOption;
  text: LangLayoutModel;
}
