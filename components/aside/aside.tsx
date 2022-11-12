import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined'; import { Button } from '@mui/material';
import StyledAside from './styled-aside';

const Aside = () => <StyledAside>
	<Button
		startIcon={<ContentPasteOutlinedIcon />}
		href="/boards"
		fullWidth >
    Boards
	</Button>
</StyledAside>;

export default Aside;
