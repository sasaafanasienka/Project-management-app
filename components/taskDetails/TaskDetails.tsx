import {
	Button,
	FormControl, InputLabel, MenuItem, Select, TextareaAutosize,
} from '@mui/material';
import {
	FC, ReactElement, useRef, useState,
} from 'react';
import { UserResponceModel } from '../../redux/slices/userSlice/interfaces';
import Divider from '../divider/Divider';
import FlexBox from '../styled/FlexBox';
import { TaskDetailsPropsModel } from './interfaces';
import StyledTaskDetails from './StyledTaskDetails';

const TaskDetails: FC<TaskDetailsPropsModel> = ({
	children, title, description, users, handleDelete, handleUpdate, boardUsers, userId,
}): ReactElement => {
	const [owner, setOwner] = useState<UserResponceModel>(
		boardUsers.find((user) => user._id === userId) as UserResponceModel,
	);
	// const [owner, setOwner] = useState<string>();
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

	const update = () => {
		const formData = {
			title: titleState,
			description: descriptionState,
			userId: owner._id,
		};
		handleUpdate(formData);
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
							value={owner._id}
							label="Owner:"
							onChange={(event) => setOwner(boardUsers.find(
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
					{/* { children } */}
					<p>{`Assigned to: ${users.join(', ')}`}</p>
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
