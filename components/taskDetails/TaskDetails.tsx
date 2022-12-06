import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextareaAutosize,
	Typography,
} from '@mui/material';
import {
	FC, ReactElement, useRef, useState,
} from 'react';
import { UserResponceModel } from '../../redux/slices/userSlice/interfaces';
import { useAppSelector } from '../../redux/store';
import Divider from '../divider/Divider';
import FlexBox from '../styled/FlexBox';
import { TaskDetailsPropsModel, TaskUpdateFormModel } from './interfaces';
import StyledTaskDetails from './StyledTaskDetails';

const TaskDetails: FC<TaskDetailsPropsModel> = ({
	title, description, users, handleDelete, handleUpdate, boardUsers, userId, isOwn,
}): ReactElement => {
	const usersAll = useAppSelector((state) => state.user.usersAll);

	const {
		noTitleText,
		noDescriptionText,
		invitedUsersText,
		ownerText,
		deleteBtn,
		updateBtn,
		cannotDelete,
	} = useAppSelector((state) => state.lang.text);

	const owner = usersAll.find((user) => user._id === userId) as UserResponceModel;

	const [taskOwner, setTaskOwner] = useState<UserResponceModel>(owner);
	const [taskUsers, setTaskUsers] = useState<string[]>(users || [] || '');
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

	// const usersHandler = (event: SelectChangeEvent<typeof taskOwner>) => {
	// const {
	// target: { value },
	// } = event;
	// setTaskUsers(value as unknown as string[]);
	// };

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
						placeholder={noTitleText}
						style={{ width: '100%' }}
					/> : <p>{title}</p>}
				</div>
				<div onClick={handleDescriptionUpdate}>
					{isTextAreaOpen ? <TextareaAutosize
						ref={textAreaRef}
						onChange={(event) => setDescription(event?.target.value)}
						value={descriptionState}
						aria-label="empty textarea"
						placeholder={noDescriptionText}
						style={{ width: '100%' }}
					/> : <p>{description}</p>}
				</div>
				<FlexBox column>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">{ownerText}</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={taskOwner._id}
							label={ownerText}
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
						>{invitedUsersText}</InputLabel>
						<Select
							labelId="demo-multiple-name-label"
							id="demo-multiple-name"
							multiple
							input={<OutlinedInput label={invitedUsersText} />}
							value={taskUsers}
							onChange={(event) => setTaskUsers(event.target.value as string[])}
						>
							{boardUsers.map((user) => (
								<MenuItem
									key={user._id}
									value={user._id as string}
								>
									{user.login}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FlexBox justifyContent='right'>
						{isOwn
							? <Button onClick={handleDelete} variant='outlined' autoFocus>
								{deleteBtn}
							</Button>
							: <Typography>{cannotDelete}</Typography>
						}
						<Button color='info' onClick={update} variant='contained'>
							{updateBtn}
						</Button>
					</FlexBox>
				</FlexBox>
			</StyledTaskDetails>
		</FlexBox>
	);
};

export default TaskDetails;
