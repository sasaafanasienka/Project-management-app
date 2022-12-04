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
  newTask: ModalStateModel,
  deleteTask: ModalStateModel,
  detailsTask: ModalStateModel,
  deleteColumn: ModalStateModel,
  createColumn: ModalStateModel,
  editBoard: ModalStateModel,
  deleteBoard: ModalStateModel,
}
