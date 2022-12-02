import { FC, ReactElement, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import FlexBox from '../styled/FlexBox';
import { TaskPropsModel } from './interfaces';
import StyledTask from './StyledTask';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';
import TaskDetails from '../taskDetails/TaskDetails';
import ModalTitleNode from '../modal/modalTitleNode/ModalTitleNode';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteTask, updateTask } from '../../redux/slices/tasksSlice';
import { BoardModel } from '../../redux/slices/boardSlice/interfaces';
import { TaskUpdateFormModel } from '../taskDetails/interfaces';

const Task: FC<TaskPropsModel> = ({
	title, description, id, columnId, userId, users, boardid, order, index,
}): ReactElement => {
	const boardUsersIds = useAppSelector((state) => {
		if (state.boards) {
			return (state.boards.boards.find((board) => board._id === boardid) as BoardModel).users;
		}
		return [];
	});

	const boardUsers = useAppSelector((state) => state.user.usersAll.filter(
		(user) => boardUsersIds.includes(user._id),
	));

	const dispatch = useAppDispatch();

	const [isDeleteOpened, setDeleteOpened] = useState<ModalWindowStateModel>(false);
	const [isDetailedOpened, setIsDetailedOpened] = useState<ModalWindowStateModel>(false);

	const handleDetailedModal = (event: MouseEvent | null, value: boolean = !isDetailedOpened) => {
		if (event) {
			event.stopPropagation();
		}
		setIsDetailedOpened(value);
	};

	const handleDeleteModal = (event: MouseEvent | null, value: boolean = !isDeleteOpened) => {
		if (event) {
			event.stopPropagation();
		}
		setDeleteOpened(value);
	};

	const handleDelete = () => {
		dispatch(deleteTask({ boardid, columnId, taskId: id }))
			.then(() => {
				handleDeleteModal(null, false);
				handleDetailedModal(null, false);
			});
	};

	const handleUpdate = (formData: TaskUpdateFormModel): void => {
		const body = {
			...formData,
			order,
			columnId,
		};
		dispatch(updateTask({
			boardid, columnId, taskId: id, body,
		})).then(() => {
			handleDetailedModal(null, false);
		});
	};

	return (
		<>
			<Draggable draggableId={title} index={index}>
				{(provided) => (
					<StyledTask
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						// innerRef={provided.innerRef}
						onClick={() => { handleDetailedModal(null); }}
					>
						<h3>{ title }</h3>
						<p>{description}</p>
						<FlexBox justifyContent='flex-end'>
							<IconButton aria-label="delete" size="small" onClick={() => { handleDeleteModal(null); }}>
								<DeleteIcon fontSize='small'/>
							</IconButton>
						</FlexBox>
					</StyledTask>
				)}
			</Draggable>
			<ModalWindow
				title={`Are you sure to delete the task "${title}"?`}
				description="This action cannot be undone"
				isOpened={isDeleteOpened}
				closeFunc={() => { handleDeleteModal(null, false); }}
			>
				<Button onClick={() => { handleDeleteModal(null); }}>Cancel</Button>
				<Button onClick={handleDelete} variant='outlined' autoFocus>
            Delete
				</Button>
			</ModalWindow>
			<ModalWindow
				title={<ModalTitleNode
					closeFn={() => { handleDetailedModal(null, false); }}
					firstRow={`Task ID: ${id}`}
					secondRow={`Owner: ${userId}`}
				/>}
				isOpened={isDetailedOpened}
				closeFunc={() => { handleDetailedModal(null, false); }}
			>
				<TaskDetails
					title={title}
					description={description}
					users={users}
					handleDelete={handleDelete}
					handleUpdate={handleUpdate}
					boardUsers={boardUsers}
					userId={userId}
				/>
			</ModalWindow>
		</>
	);
};

export default Task;
