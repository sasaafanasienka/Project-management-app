import { FC, ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import FlexBox from '../../styled/FlexBox';
import StyledModalTitleNode from './StyledModalTitleNode';
import { ModalTitleNodeProps } from './interfaces';

const ModalTitleNode: FC<ModalTitleNodeProps> = ({
	firstRow,
	secondRow,
	closeFn,
}): ReactElement => (
	<StyledModalTitleNode>
		<FlexBox column alignItems='left' gap='0'>
			<span>
				{firstRow}
			</span>
			{secondRow
			&& <span>
				{secondRow}
			</span>
			}
		</FlexBox>
		<IconButton onClick={closeFn}
			color="secondary"
		>
			<CloseIcon />
		</IconButton>
	</StyledModalTitleNode>
);

export default ModalTitleNode;
