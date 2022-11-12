import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { Button, IconButton } from '@mui/material';
import { FC, ReactElement } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import StyledAside from './StyledAside';


const Aside: FC = (): ReactElement => {
	const isDesktop = useMediaQuery('(min-width:1024px)');

	return (
		<StyledAside>
			{
				isDesktop && <>
					<Button
						startIcon={<ContentPasteOutlinedIcon />}
						color="secondary"
						href="/boards"
						fullWidth >
						Boards
					</Button>
				</>
			}
			{
				!isDesktop && <>
					<IconButton
						color="secondary"
						href="/boards"
					>
						<ContentPasteOutlinedIcon />
					</IconButton>
				</>
			}
		</StyledAside>
	);
};

export default Aside;
