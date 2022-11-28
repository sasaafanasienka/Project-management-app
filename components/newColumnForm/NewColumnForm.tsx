import {
	Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { useForm } from 'react-hook-form';
import { BoardModel } from '../../redux/slices/boardSlice/interfaces';
import { ColumnModel } from '../../redux/slices/columnSlice/interfaces';
import { useAppSelector } from '../../redux/store';
import ModalUserTag from '../modal/modalUserTag/modalUserTag';
import FlexBox from '../styled/FlexBox';
import StyledNewBoardForm from './StyledNewColumnForm';

export interface NewBoardFormProps {
  onSubmit: (arg0: ColumnModel) => void;
  onClose: () => void;
}

const NewColumnForm: FC<NewBoardFormProps> = ({ onSubmit, onClose }): ReactElement => {
	const {
		register, handleSubmit, formState: {
			errors, isDirty,
		},
	} = useForm<BoardModel>();
	return (
		<StyledNewBoardForm onSubmit={handleSubmit(onSubmit)}>
			<FlexBox column alignItems='stretch'>
				<TextField label="Title" variant="outlined" {...register('title', {
					required: 'Please enter board title',
				})}
				error={!!errors.title} helperText={errors?.title ? errors?.title.message : null}
				/>
				<FlexBox justifyContent='right'>
					<Button onClick={onClose}>Cancel</Button>
					<Button type="submit" color='info' variant='contained' disabled={!isDirty} autoFocus>
                    Create
					</Button>
				</FlexBox>
			</FlexBox>
		</StyledNewBoardForm>
	);
};

export default NewColumnForm;
