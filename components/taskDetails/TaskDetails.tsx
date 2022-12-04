import {
	Button,
	FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextareaAutosize,
} from '@mui/material';
import {
	FC, ReactElement, useRef, useState,
} from 'react';
import { UserResponceModel } from '../../redux/slices/userSlice/interfaces';
import Divider from '../divider/Divider';
import FlexBox from '../styled/FlexBox';
import { TaskDetailsPropsModel, TaskUpdateFormModel } from './interfaces';
import StyledTaskDetails from './StyledTaskDetails';

const TaskDetails: FC<TaskDetailsPropsModel> = ({
	title, description, users, handleDelete, handleUpdate, boardUsers, userId,
}): ReactElement => {
	const owner = boardUsers.find((user) => user._id === userId) as UserResponceModel;

	console.log(users);

	const [taskOwner, setTaskOwner] = useState<UserResponceModel>(owner);
	const [taskUsers, setTaskUsers] = useState<string[]>(users);
	const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);
	const [descriptionState, setDescription] = useState(description);
	const [isTextAreaTitleOpen, setIsTextAreaTitleOpen] = useState(false);
	const [titleState, setTitle] = useState(title);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);

	const handleDescriptionUpdate = () => {
		setIsTextAreaOpen(true);
		if (textAreaRef.current) {
			textAreaRef.current.selectionStart = textAreaRef.current.value.length;
		}
	};

	const handleTitleUpdate = () => {
		setIsTextAreaTitleOpen(true);
		if (textAreaTitleRef.current) {
			textAreaTitleRef.current.selectionStart = textAreaTitleRef.current.value.length;
		}
	};

	const update = (): void => {
		const formData: TaskUpdateFormModel = {
			title: titleState,
			description: descriptionState,
			userId: taskOwner._id,
			users: taskUsers,
		};
		handleUpdate(formData);
	};

	const usersHandler = (event: SelectChangeEvent<typeof taskOwner>) => {
		const {
			target: { value },
		} = event;
		setTaskUsers(value);
	};

	return (
		<FlexBox column>
			<Divider />
			<StyledTaskDetails>
				<div onClick={handleTitleUpdate}>
					{isTextAreaTitleOpen ? <TextareaAutosize
						ref={textAreaTitleRef}
						onChange={(event) => setTitle(event?.target.value)}
						value={titleState}
						aria-label="empty textarea"
						placeholder="No title"
						style={{ width: '100%' }}
					/> : <p>{title}</p>}
				</div>
				<div onClick={handleDescriptionUpdate}>
					{isTextAreaOpen ? <TextareaAutosize
						ref={textAreaRef}
						onChange={(event) => setDescription(event?.target.value)}
						value={descriptionState}
						aria-label="empty textarea"
						placeholder="No description"
						style={{ width: '100%' }}
					/> : <p>{description}</p>}
				</div>
				<FlexBox column>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Owner: </InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={taskOwner._id}
							label="Owner:"
							onChange={(event) => setTaskOwner(boardUsers.find(
								(user) => user._id === event.target.value,
							) as UserResponceModel)}
						>
							{boardUsers.map((item) => (
								<MenuItem
									key={item._id}
									value={item._id}
								>
									{item.login}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id="demo-multiple-name-label"
						>Invited users:</InputLabel>
						<Select
							labelId="demo-multiple-name-label"
							id="demo-multiple-name"
							multiple
							input={<OutlinedInput label="Invited users" />}
							value={taskUsers}
							onChange={usersHandler}
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
						<Button onClick={handleDelete} variant='outlined' autoFocus>
								Delete
						</Button>
						<Button color='info' onClick={update} variant='contained'>
								Update
						</Button>
					</FlexBox>
				</FlexBox>
			</StyledTaskDetails>
		</FlexBox>
	);
};

export default TaskDetails;
