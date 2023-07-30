export type ModalNameModel =
  'newTask'
  | 'deleteTask'
  | 'detailsTask'
  | 'deleteColumn'
  | 'createColumn'
  | 'editBoard'
  | 'deleteBoard'

export type ModalStateModel = string | null

export interface InitialStateModalsModel {
  [key: string]: string
  // 'newTask': string,
  // 'deleteTask': string,
  // 'detailsTask': string,
  // 'deleteColumn': string,
  // 'createColumn': string,
  // 'editBoard': string,
  // 'deleteBoard': string,
}
