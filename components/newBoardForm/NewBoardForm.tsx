import {
	Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { useForm } from 'react-hook-form';
import { BoardModel } from '../../redux/slices/boardSlice/interfaces';
import { useAppSelector } from '../../redux/store';
import ModalUserTag from '../modal/modalUserTag/modalUserTag';
import FlexBox from '../styled/FlexBox';
import StyledNewBoardForm from './StyledNewBoardForm';

export interface NewBoardFormProps {
  onSubmit: (arg0: BoardModel) => void;
  onClose: () => void;
	updateMode?: {
		assignedUsers: Array<string>;
		currentTitle: string;
	}
}

const NewBoardForm: FC<NewBoardFormProps> = ({ onSubmit, onClose, updateMode }): ReactElement => {
	const {
		cancelBtn,
		createBtn,
		updateBtn,
		invitedUsersText,
		pleaseEnterTitle,
		createNewFormTitle,
	} = useAppSelector((state) => state.lang.text);


	const usersAll = useAppSelector((state) => state.user.usersAll);
	const [personName, setPersonName] = React.useState<string[]>(updateMode?.assignedUsers || []);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	const handleDelete = (login: string) => {
		const [user] = usersAll.filter((userObj) => userObj.login === login);
		setPersonName((invitedUsers) => invitedUsers.filter((u) => u !== user._id));
	};

	const transformIdToName = (id: string) => {
		const [user] = usersAll.filter((userObj) => userObj._id === id);

		return (
			<ModalUserTag
				name={user?.login}
				key={user?.login}
				deleteUser={handleDelete}
			/>
		);
	};

	const {
		register, handleSubmit, formState: {
			errors, isDirty,
		},
	} = useForm<BoardModel>();
	return (
		<StyledNewBoardForm onSubmit={handleSubmit(onSubmit)}>
			<FlexBox column alignItems='stretch'>
				<TextField label={createNewFormTitle} variant="outlined" defaultValue={updateMode?.currentTitle} {...register('title', {
					required: pleaseEnterTitle,
				})}
				error={!!errors.title} helperText={errors?.title ? errors?.title.message : null}
				/>
				<FlexBox justifyContent='left' wrap='wrap' gap='5px'>
					{personName.map(transformIdToName)}
				</FlexBox>
				<FormControl>
					<InputLabel id="demo-multiple-name-label"
					>{invitedUsersText}</InputLabel>
					<Select
						{...register('users')}
						labelId="demo-multiple-name-label"
						id="demo-multiple-name"
						multiple
						input={<OutlinedInput label={invitedUsersText}/>}
						value={personName}
						onChange={handleChange}
					>
						{usersAll.map((user) => (
							<MenuItem
								key={user._id}
								value={user._id}
							>
								{user.login}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FlexBox justifyContent='right'>
					<Button onClick={onClose}>{cancelBtn}</Button>
					<Button type="submit" color='info' variant='contained' disabled={!isDirty} autoFocus>
						{updateMode ? updateBtn : createBtn }
					</Button>
				</FlexBox>
			</FlexBox>
		</StyledNewBoardForm>
	);
};

export default NewBoardForm;
