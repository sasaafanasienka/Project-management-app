export enum FilterOptionsModel {
	all = 'all',
	own = 'own',
	guest = 'guest',
}

export interface BoardFilterBarProps {
	onChange: (arg0: FilterOptionsModel) => void;
}
