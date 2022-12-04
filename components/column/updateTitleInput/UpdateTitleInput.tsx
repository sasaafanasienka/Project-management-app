import { IconButton, TextareaAutosize } from '@mui/material';
import { FC, ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import FlexBox from '../../styled/FlexBox';
import StyledUpdateTitleInputs from './StyledUpdateTitleInput';
import { UpdateTitleInputProps } from './interfaces';

const UpdateTitleInput: FC<UpdateTitleInputProps> = ({
	value,
	onChange,
	onConfirm,
	onCancel,
}): ReactElement => (
	<StyledUpdateTitleInputs>
		<TextareaAutosize value={value} onChange={onChange} style={{ width: '100%' }} />
		<FlexBox wrap='no-wrap' width='auto' gap='0'>
			<IconButton onClick={onConfirm} aria-label="confirm" size="small">
				<CheckIcon color='success' />
			</IconButton>
			<IconButton onClick={onCancel} aria-label="cancel" size="small">
				<CloseIcon color='error' />
			</IconButton>
		</FlexBox>
	</StyledUpdateTitleInputs>
);

export default UpdateTitleInput;
