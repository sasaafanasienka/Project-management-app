import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
	FC, ReactElement, useState, MouseEvent,
} from 'react';
import { useAppSelector } from '../../../redux/store';
import { BoardFilterBarProps } from './interfaces';
import StyledSideLine from './StyledSideLine';

const BoardFilterBar: FC<BoardFilterBarProps> = ({ onChange }): ReactElement => {
	const {
		filterAllBoards,
		filterOwnBoards,
		filterGuestBoards,
	} = useAppSelector((state) => state.lang.text);

	const [alignment, setAlignment] = useState<string>('all');

	const handleChange = (
		event: MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		onChange(newAlignment);
		setAlignment(newAlignment || 'all');
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
			<ToggleButton value={'all'}>{filterAllBoards}</ToggleButton>
			<ToggleButton value={'own'}><StyledSideLine owned />
				{filterOwnBoards}
			</ToggleButton>
			<ToggleButton value={'guest'}>
				<StyledSideLine />{filterGuestBoards}
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default BoardFilterBar;
