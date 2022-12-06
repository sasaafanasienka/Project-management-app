import {
	Button, TextField,
} from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { useForm } from 'react-hook-form';
import { ColumnModel } from '../../redux/slices/columnSlice/interfaces';
import { useAppSelector } from '../../redux/store';
import FlexBox from '../styled/FlexBox';
import StyledNewBoardForm from './StyledNewColumnForm';

export interface NewBoardFormProps {
  onSubmit: (arg0: ColumnModel) => void;
  onClose: () => void;
}

const NewColumnForm: FC<NewBoardFormProps> = ({ onSubmit, onClose }): ReactElement => {
	const {
		createBtn, cancelBtn, pleaseEnterTitle, createNewFormTitle,
	} = useAppSelector((state) => state.lang.text);

	const {
		register, handleSubmit, getValues, formState: {
			errors, isDirty,
		},
	} = useForm<ColumnModel>();
	return (
		<StyledNewBoardForm onSubmit={handleSubmit(() => { onSubmit(getValues()); })}>
			<FlexBox column alignItems='stretch'>
				<TextField label={createNewFormTitle} variant="outlined" {...register('title', {
					required: pleaseEnterTitle,
				})}
				error={!!errors.title} helperText={errors?.title ? errors?.title.message : null}
				/>
				<FlexBox justifyContent='right'>
					<Button onClick={onClose}>{cancelBtn}</Button>
					<Button type="submit" color='info' variant='contained' disabled={!isDirty} autoFocus>
						{createBtn}
					</Button>
				</FlexBox>
			</FlexBox>
		</StyledNewBoardForm>
	);
};

export default NewColumnForm;
