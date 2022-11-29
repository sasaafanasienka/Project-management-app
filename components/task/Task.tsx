import {
	FC, ReactElement, useState, useRef, SyntheticEvent,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import FlexBox from '../styled/FlexBox';
import { TaskPropsModel } from './interfaces';
import StyledTask from './StyledTask';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';
import { ItemTypes } from '../board/interfaces';
import TaskDetails from '../taskDetails/TaskDetails';
import ModalTitleNode from '../modal/modalTitleNode/ModalTitleNode';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteTask, updateTask } from '../../redux/slices/tasksSlice';

const Task: FC<TaskPropsModel> = (props): ReactElement => {
	const {
		title, description, id, index, columnIndex, moveTask, columnId, userId, users, boardid, order,
	} = { ...props };

	const boardUsersIds = useAppSelector((state) => (state.boards.boards).find(
		(board) => board._id === boardid,
	).users);

	const boardUsers = useAppSelector((state) => state.user.usersAll.filter(
		(user) => boardUsersIds.includes(user._id),
	));

	const dispatch = useAppDispatch();

	const [isDeleteOpened, setDeleteOpened] = useState<ModalWindowStateModel>(false);
	const [isDetailedOpened, setIsDetailedOpened] = useState<ModalWindowStateModel>(false);

	const handleDetailedModal = (event, value: boolean = !isDetailedOpened) => {
		if (event) {
			event.stopPropagation();
		}
		setIsDetailedOpened(value);
	};

	const handleDeleteModal = (event, value: boolean = !isDeleteOpened) => {
		if (event) {
			event.stopPropagation();
		}
		setDeleteOpened(value);
	};

	const handleDelete = () => {
		dispatch(deleteTask({ boardid, columnId, taskId: id }))
			.then(() => {
				handleDeleteModal(false);
				handleDetailedModal(false);
			});
	};

	const handleUpdate = (formData) => {
		const body = {
			...formData,
			order,
			columnId,
			users,
		};
		dispatch(updateTask({
			boardid, columnId, taskId: id, body,
		})).then(() => {
			handleDetailedModal(false);
		});
	};

	return (
		<>
			<StyledTask
				onClick={handleDetailedModal}
			>
				<h3>{ title }</h3>
				<p>{description}</p>
				<FlexBox justifyContent='space-between'>
					<p style={{ width: '40%', margin: 0 }}>{`Owner: ${boardUsers.find((user) => user._id === userId).login}`}</p>
					<IconButton aria-label="delete" size="small" onClick={handleDeleteModal}>
						<DeleteIcon fontSize='small'/>
					</IconButton>
				</FlexBox>
			</StyledTask>
			<ModalWindow
				title={`Are you sure to delete the task "${title}"?`}
				description="This action cannot be undone"
				isOpened={isDeleteOpened}
				closeFunc={() => { handleDeleteModal(false); }}
			>
				<Button onClick={handleDeleteModal}>Cancel</Button>
				<Button onClick={handleDelete} variant='outlined' autoFocus>
            Delete
				</Button>
			</ModalWindow>
			<ModalWindow
				title={<ModalTitleNode
					closeFn={() => { handleDetailedModal(false); }}
					firstRow={`Task ID: ${id}`}
					secondRow={`Owner: ${userId}`}
				/>}
				isOpened={isDetailedOpened}
				closeFunc={() => { handleDetailedModal(false); }}
			>
				<TaskDetails
					title={title}
					description={description}
					users={users}
					handleDelete={handleDelete}
					handleUpdate={handleUpdate}
					boardUsers={boardUsers}
					userId={userId}
				>
					{/* <FlexBox justifyContent='right'>
						<Button onClick={handleDelete} variant='outlined' autoFocus>
								Delete
						</Button>
						<Button color='info' onClick={handleUpdate} variant='contained'>
								Update
						</Button>
					</FlexBox> */}
				</TaskDetails>
			</ModalWindow>
		</>
	);
};

export default Task;
