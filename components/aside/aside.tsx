import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { Button } from '@mui/material';
import { FC, ReactElement } from 'react';
import StyledAside from './StyledAside';

const Aside: FC = ():ReactElement => <StyledAside>
	<Button
		startIcon={<ContentPasteOutlinedIcon />}
		href="/boards"
		fullWidth >
    Boards
	</Button>
</StyledAside>;

export default Aside;
