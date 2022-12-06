import {
	FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextareaAutosize,
} from '@mui/material';
import {
	FC, ReactElement, useEffect, useRef, useState,
} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '../../divider/Divider';
import FlexBox from '../../styled/FlexBox';
import { TaskDetailsPropsModel } from './interfaces';
import StyledModalDetailsUpdate from './StyledModalDetailsUpdate';
import ModalUserTag from '../modalUserTag/modalUserTag';
import { useAppSelector } from '../../../redux/store';
import { UserResponceModel } from '../../../redux/slices/userSlice/interfaces';

const ModalDetailsUpdate: FC<TaskDetailsPropsModel> = ({
	children, title, description, onUpdate,
}): ReactElement => {
	const {
		noTitleText,
		noDescriptionText,
		invitedUsersText,
	} = useAppSelector((state) => state.lang.text);

	const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);
	const [descriptionState, setDescription] = useState(description);
	const [isTextAreaTitleOpen, setIsTextAreaTitleOpen] = useState(false);
	const [titleState, setTitle] = useState(title);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const textAreaTitleRef = useRef<HTMLTextAreaElement>(null);
	const user = useAppSelector((state) => state.user.user.id);

	const usersAll = useAppSelector((state) => state.user.usersAll);

	const [updatedUsers, setUpdatedUsers] = useState<Array<UserResponceModel>>([]);
	const [toChooseFromUsers, setToChooseFromUsers] = useState<Array<UserResponceModel>>(usersAll);

	useEffect(() => {
		const usersToAdd = updatedUsers.map((u) => u._id);

		if (onUpdate) {
			onUpdate({
				_id: '',
				title: textAreaTitleRef.current?.value ?? '',
				owner: user,
				users: usersToAdd,
			});
		}
	}, [onUpdate, textAreaTitleRef, updatedUsers, user]);


	const handleDeleteUser = (name: string) => {
		setUpdatedUsers((oldUsers) => oldUsers.filter((u) => u.login !== name));
		setToChooseFromUsers((state) => state.concat(...usersAll.filter((u) => u.login === name)));
	};

	const handleSelectChoice = (e: SelectChangeEvent) => {
		const target = e.target as HTMLInputElement;
		const actualUser = usersAll.filter((u) => u.login === target.value);
		setUpdatedUsers((state) => {
			state.push(actualUser[0]);
			return state;
		});
		setToChooseFromUsers((state) => state.filter((u) => u.login !== target.value));
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
						placeholder={noTitleText}
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
							placeholder={noDescriptionText}
							style={{ width: '100%' }}
						/> : <p>{description}</p>}
					</div>
				}
				<FlexBox justifyContent='left' wrap='wrap' gap='5px'>
					{updatedUsers.map((u) => <ModalUserTag
						name={u.login}
						key={u._id}
						deleteUser={handleDeleteUser} />)}
				</FlexBox>
				<FlexBox column>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">{invitedUsersText}</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							label={invitedUsersText}
							onChange={handleSelectChoice}
						>
							{(toChooseFromUsers || [])
								.map((userOption) => <MenuItem
									key={userOption._id}
									value={userOption.login}>
									{userOption.login}
								</MenuItem>)}
						</Select>
					</FormControl>
					{ children }
				</FlexBox>
			</StyledModalDetailsUpdate>
		</FlexBox>
	);
};

export default ModalDetailsUpdate;
