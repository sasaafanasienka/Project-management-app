export type ModalNameModel =
  'newTask'
  | 'deleteTask'
  | 'detailsTask'
  | 'deleteColumn'
  | 'createColumn'

export interface InitialStateModalsModel {
  newTask: boolean,
  deleteTask: boolean,
  detailsTask: boolean,
  deleteColumn: boolean,
  createColumn: boolean,
}
