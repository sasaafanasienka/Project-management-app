import { FC, ReactElement } from 'react';
import { Button } from '@mui/material';
import { AsideButtonPropsModel } from './interfaces';

const AsideButton: FC<AsideButtonPropsModel> = (props): ReactElement => {
	const { startIcon, children, onClick } = { ...props };

	return (
		<Button onClick={onClick}
			startIcon={startIcon}
			color="secondary"
			sx={{
				paddingInline: '15px',
				justifyContent: 'flex-start',
				letterSpacing: '-0.01em',
				textTransform: 'capitalize',
			}}
			fullWidth >
			{children}
		</Button>
	);
};


export default AsideButton;
