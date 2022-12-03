export type ModalNameModel =
  'newTask'
  | 'deleteTask'
  | 'detailsTask'
  | 'deleteColumn'
  | 'createColumn'
  | 'editBoard'
  | 'deleteBoard'

export interface InitialStateModalsModel {
  newTask: boolean,
  deleteTask: boolean,
  detailsTask: boolean,
  deleteColumn: boolean,
  createColumn: boolean,
  editBoard: boolean,
  deleteBoard: boolean,
}
