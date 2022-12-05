/* eslint-disable no-unused-vars */
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
  homeBtnBoards: string;
  navProfile: string;
  navBoards: string;
  navHome: string;
  singIn: string;
  singUp: string;
  singOut: string;
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
  updateBoardHeader: string;
  createTaskHeader: string;
  createColumnHeader: string;
  createNewFormTitle: string;
  createNewFormDescr: string;
  addBtn: string;
  confirmBtn: string;
  cancelBtn: string;
  deleteBtn: string;
  updateBtn: string;
  changeUser: string;
  assignTo: string;
  confirmation: string;
  confirmationDeleteBoard: string;
  confirmationDeleteTask: string;
  confirmationDeleteColumn: string;
  confirmationDescription: string;
  deleteColumn: string;
  deleteTask: string;
  deleteBoard: string;
  deleteUser: string;
  successCreated: string;
  successDeleted: string;
  editProfile: string;
  singUpGreet: string;
	singUpMessage: string;
	singInGreet: string;
	singInMessage: string;
  toastSuccessLogIn: string;
  toastFailureLogIn: string;
  toastSuccessSignUp: string;
	toastFailureSignUpHasAccount: string;
	toastFailureSignUp: string;
  toastProfileUpdatedSuccess: string;
	toastProfileUpdatedFailureLogin: string;
	toastProfileUpdatedFailure: string;
  toastDeleteUserSuccess: string;
	toastDeleteUserFailure: string;
  notFound: string;
  errorBoundary: string;
  ownerText: string,
  taskIdText: string,
  toastUnknownError: string,
  boardTxt: string,
	columnTxt: string,
  taskTxt: string,
  userTxt: string,
	scsCreated: string,
	scsDeleted: string,
	scsUpdated: string,
	usrDeleted: string,
  usrUpdated: string,
  errorOccured: string,
  cannotDelete: string
  successfullyLogged: string,
  successfullyRegistered: string,
  somethingWrong: string,
  logoText: string,
  noTitleText: string,
	noDescriptionText: string,
  invitedUsersText: string,
  filterAllBoards: string,
	filterOwnBoards: string,
	filterGuestBoards: string,
}

export interface InitialLangStateModel {
  currentLang: LangOption;
  text: LangLayoutModel;
}
