import {
	FormControl, InputLabel, MenuItem, Select, TextareaAutosize,
} from '@mui/material';
import {
	FC, ReactElement, useRef, useState,
} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '../../divider/Divider';
import FlexBox from '../../styled/FlexBox';
import { TaskDetailsPropsModel } from './interfaces';
import StyledModalDetailsUpdate from './StyledModalDetailsUpdate';
import ModalUserTag from '../modalUserTag/modalUserTag';

const ModalDetailsUpdate: FC<TaskDetailsPropsModel> = ({
	children, title, description, users,
}): ReactElement => {
	const [user, setUser] = useState<string>();
	const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);
	const [descriptionState, setDescription] = useState(description);
	const [isTextAreaTitleOpen, setIsTextAreaTitleOpen] = useState(false);
	const [titleState, setTitle] = useState(title);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);

	const [updatedUsers, setUpdatedUsers] = useState<Array<string>>(users);
	// const [toChooseFromUsers, setToChooseFromUsers] = useState<Array<string>>(usersAll);

	const handleDeleteUser = (name: string) => {
		setUpdatedUsers((oldUsers) => oldUsers.filter((u) => u !== name));
	};

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
		<FlexBox column alignItems='end'>
			<Divider />
			<StyledModalDetailsUpdate>
				<div onClick={handleTitleUpdate}>
					{isTextAreaTitleOpen ? <TextareaAutosize
						ref={textAreaTitleRef}
						onChange={(event) => setTitle(event?.target.value)}
						value={titleState}
						aria-label="empty textarea"
						placeholder="No title"
						style={{ width: '100%' }}
					/> : <p>
						<EditIcon color='secondary' />
						{title}
					</p>}
				</div>
				{description
					&& <div onClick={handleDescriptionUpdate}>
						<EditIcon color='secondary' />
						{isTextAreaOpen ? <TextareaAutosize
							ref={textAreaRef}
							onChange={(event) => setDescription(event?.target.value)}
							value={descriptionState}
							aria-label="empty textarea"
							placeholder="No description"
							style={{ width: '100%' }}
						/> : <p>{description}</p>}
					</div>
				}
				<FlexBox justifyContent='left' wrap='wrap' gap='5px'>
					{updatedUsers.map((name) => <ModalUserTag
						name={name}
						key={name}
						deleteUser={handleDeleteUser} />)}
				</FlexBox>
				<FlexBox column>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Invite users: </InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={user}
							label="Invite users: "
							onChange={(event) => setUser(event.target.value)}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
					{ children }
				</FlexBox>
			</StyledModalDetailsUpdate>
		</FlexBox>
	);
};

export default ModalDetailsUpdate;
