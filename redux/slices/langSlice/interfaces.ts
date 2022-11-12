export enum LangOption  {
  EN = 'EN',
  RU = 'RU',
};

export interface InitialStateModel {
  currentLang: LangOption;
  text:LangLayoutModel; 
}

export interface LangLayoutModel {
  [K: string]: string
}
