import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
	FC, ReactElement, useState, MouseEvent,
} from 'react';
import { BoardFilterBarProps, FilterOptionsModel } from './interfaces';
import StyledSideLine from './StyledSideLine';

const BoardFilterBar: FC<BoardFilterBarProps> = ({ onChange }): ReactElement => {
	const [alignment, setAlignment] = useState<FilterOptionsModel>(FilterOptionsModel.all);

	const handleChange = (
		event: MouseEvent<HTMLElement>,
		newAlignment: FilterOptionsModel,
	) => {
		onChange(newAlignment);
		setAlignment(newAlignment || FilterOptionsModel.all);
	};

	return (
		<ToggleButtonGroup
			color="info"
			value={alignment}
			exclusive
			onChange={handleChange}
			aria-label="Board owner filtering"
			size='small'
		>
			<ToggleButton value={FilterOptionsModel.all}>All</ToggleButton>
			<ToggleButton value={FilterOptionsModel.own}><StyledSideLine owned />
				Own Boards
			</ToggleButton>
			<ToggleButton value={FilterOptionsModel.guest}><StyledSideLine /> Guest Boards</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default BoardFilterBar;
