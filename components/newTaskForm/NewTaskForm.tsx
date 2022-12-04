import {
	Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { CreateTaskBodyModel } from '../../redux/slices/tasksSlice/interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ModalUserTag from '../modal/modalUserTag/modalUserTag';
import FlexBox from '../styled/FlexBox';
import { NewBoardFormProps } from './interfaces';
import StyledNewBoardForm from './StyledNewTaskForm';

const NewTaskForm: FC<NewBoardFormProps> = ({ onSubmit, onClose, boardId }): ReactElement => {
	const dispatch = useAppDispatch();

	const boardUsersIds = useAppSelector((state) => {
		if (state.boards) {
			const currentBoard = state.boards.boards.find((board) => board._id === boardId);
			return currentBoard ? currentBoard.users : [];
		}
		return [];
	});

	const boardUsers = useAppSelector((state) => state.user.usersAll.filter(
		(user) => boardUsersIds.includes(user._id),
	));

	const [personName, setPersonName] = React.useState<string[]>([]);

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
		const [user] = boardUsers.filter((userObj) => userObj.login === login);
		setPersonName((invitedUsers) => invitedUsers.filter((u) => u !== user._id));
	};

	const transformIdToName = (id: string) => {
		const [user] = boardUsers.filter((userObj) => userObj._id === id);

		return (
			<ModalUserTag
				name={user?.login}
				key={user?.login}
				deleteUser={handleDelete}
			/>
		);
	};

	const {
		register, handleSubmit, getValues, formState: {
			errors, isDirty,
		},
	} = useForm<CreateTaskBodyModel>();
	return (
		<StyledNewBoardForm onSubmit={handleSubmit(() => { onSubmit(getValues()); })}>
			<FlexBox column alignItems='stretch'>
				<TextField label="Title" variant="outlined" {...register('title', {
					required: 'Please enter task title',
				})}
				error={!!errors.title}
				helperText={errors?.title ? errors?.title.message : null}
				/>
				<TextField label="Description" variant="outlined" {...register('description', {
					required: 'Please enter task description',
				})}
				error={!!errors.description}
				helperText={errors?.description ? errors?.description.message : null}
				/>
				<FlexBox justifyContent='left' wrap='wrap' gap='5px'>
					{personName.map(transformIdToName)}
				</FlexBox>
				<FormControl>
					<InputLabel id="demo-multiple-name-label"
					>Invite users: </InputLabel>
					<Select
						{...register('users')}
						labelId="demo-multiple-name-label"
						id="demo-multiple-name"
						multiple
						input={<OutlinedInput label="Choose Users" />}
						value={personName}
						onChange={handleChange}
					>
						{boardUsers.map((user) => (
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
					<Button onClick={onClose}>Cancel</Button>
					<Button type="submit" color='info' variant='contained' disabled={!isDirty} autoFocus>
                    Create
					</Button>
				</FlexBox>
			</FlexBox>
		</StyledNewBoardForm>
	);
};

export default NewTaskForm;
