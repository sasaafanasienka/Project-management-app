import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
	FC, ReactElement, useState, MouseEvent,
} from 'react';
import StyledSideLine from './StyledSideLine';

const BoardFilterBar: FC = (): ReactElement => {
	const [alignment, setAlignment] = useState('web');

	const handleChange = (
		event: MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setAlignment(newAlignment);
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
			<ToggleButton value="All">All</ToggleButton>
			<ToggleButton value="ownerd"><StyledSideLine owned /> Owned Boards</ToggleButton>
			<ToggleButton value="guest"><StyledSideLine /> Guest Boards</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default BoardFilterBar;
