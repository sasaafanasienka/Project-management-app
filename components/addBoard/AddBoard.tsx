import { FC, ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import StyledAddBoard from './StyledAddBoard';

const AddBoard: FC<{onClick: () => void}> = ({ onClick }): ReactElement => (
	<StyledAddBoard onClick={onClick}>
		<AddIcon fontSize='large' />
	</StyledAddBoard>
);

export default AddBoard;
