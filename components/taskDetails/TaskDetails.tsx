import {
	FormControl, InputLabel, MenuItem, Select, TextareaAutosize,
} from '@mui/material';
import {
	FC, ReactElement, useRef, useState,
} from 'react';
import Divider from '../divider/Divider';
import FlexBox from '../styled/FlexBox';
import { TaskDetailsPropsModel } from './interfaces';
import StyledTaskDetails from './StyledTaskDetails';

const TaskDetails: FC<TaskDetailsPropsModel> = ({ children, task }): ReactElement => {
	const [user, setUser] = useState<string>();
	const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);
	const [description, setDescription] = useState(task.description);
	const [isTextAreaTitleOpen, setIsTextAreaTitleOpen] = useState(false);
	const [title, setTitle] = useState(task.title);
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

	return (
		<FlexBox column>
			<Divider />
			<StyledTaskDetails>
				<div onClick={handleTitleUpdate}>
					{isTextAreaTitleOpen ? <TextareaAutosize
						ref={textAreaTitleRef}
						onChange={(event) => setTitle(event?.target.value)}
						value={title}
						aria-label="empty textarea"
						placeholder="No title"
						style={{ width: '100%' }}
					/> : <p>{task.title}</p>}
				</div>
				<div onClick={handleDescriptionUpdate}>
					{isTextAreaOpen ? <TextareaAutosize
						ref={textAreaRef}
						onChange={(event) => setDescription(event?.target.value)}
						value={description}
						aria-label="empty textarea"
						placeholder="No description"
						style={{ width: '100%' }}
					/> : <p>{task.description}</p>}
				</div>
				<p>{`Assigned to: ${task.users.map((i) => i).toString()}`}</p>
				<FlexBox column>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Assign to: </InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={user}
							label="Assign to:"
							onChange={(event) => setUser(event.target.value)}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
					{ children }
				</FlexBox>
			</StyledTaskDetails>
		</FlexBox>
	);
};

export default TaskDetails;
