import { FC, ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import StyledAddBoard from './StyledAddBoard';

const AddBoard: FC = (): ReactElement => (
	<StyledAddBoard>
		<AddIcon fontSize='large' />
	</StyledAddBoard>
);

export default AddBoard;
