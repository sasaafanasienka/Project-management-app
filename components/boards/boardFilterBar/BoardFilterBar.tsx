import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
	FC, ReactElement, useState, MouseEvent,
} from 'react';
import { useAppSelector } from '../../../redux/store';
import { BoardFilterBarProps, FilterOptionsModel } from './interfaces';
import StyledSideLine from './StyledSideLine';

const BoardFilterBar: FC<BoardFilterBarProps> = ({ onChange }): ReactElement => {
	const {
		filterAllBoards,
		filterOwnBoards,
		filterGuestBoards,
	} = useAppSelector((state) => state.lang.text);

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
			<ToggleButton value={FilterOptionsModel.all}>{filterAllBoards}</ToggleButton>
			<ToggleButton value={FilterOptionsModel.own}><StyledSideLine owned />
				{filterOwnBoards}
			</ToggleButton>
			<ToggleButton value={FilterOptionsModel.guest}>
				<StyledSideLine />{filterGuestBoards}
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default BoardFilterBar;
