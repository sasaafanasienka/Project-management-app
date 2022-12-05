import { FC, ReactElement, SyntheticEvent } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import FlexBox from '../styled/FlexBox';
import { TaskPropsModel } from './interfaces';
import StyledTask from './StyledTask';
import ModalWindow from '../modal/ModalWindow';
import TaskDetails from '../taskDetails/TaskDetails';
import ModalTitleNode from '../modal/modalTitleNode/ModalTitleNode';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteTask, updateTask } from '../../redux/slices/tasksSlice';
import { openModal, closeModals } from '../../redux/slices/modalsSlice';
import { BoardModel } from '../../redux/slices/boardSlice/interfaces';
import { TaskUpdateFormModel } from '../taskDetails/interfaces';
import { ModalNameModel } from '../../redux/slices/modalsSlice/interfaces';

const Task: FC<TaskPropsModel> = ({
	title, description, id, columnId, userId, users, boardId, order, index,
}): ReactElement => {
	const boardUsersIds = useAppSelector((state) => {
		if (state.boards) {
			return (state.boards.boards.find((board) => board._id === boardId) as BoardModel)?.users;
		}
		return [];
	});
	const usersAll = useAppSelector((state) => state.user.usersAll);

	const boardUsers = usersAll.filter(
		(user) => boardUsersIds?.includes(user._id),
	);

	const deleteTaskModalState = useAppSelector((state) => state.modals.deleteTask);
	const detailsTaskModalState = useAppSelector((state) => state.modals.detailsTask);
	const currentUserId = useAppSelector((state) => state.user.user.id);

	const owner = usersAll
		? usersAll.find((user) => user._id === userId)?.login
		: '';

	const isOwn = currentUserId === userId;

	const dispatch = useAppDispatch();

	const handleOpenModal = (event: SyntheticEvent, name: ModalNameModel) => {
		event.stopPropagation();
		dispatch(openModal({ name, id }));
	};

	const handleCloseModals = () => {
		dispatch(closeModals());
	};

	const handleDelete = () => {
		dispatch(deleteTask({ boardId, columnId, taskId: id }))
			.then(() => {
				handleCloseModals();
			});
	};

	const handleUpdate = (formData: TaskUpdateFormModel): void => {
		const body = {
			...formData,
			order,
			columnId,
		};
		dispatch(updateTask({
			boardId, columnId, taskId: id, body,
		})).then(() => {
			dispatch(closeModals());
		});
	};

	return (
		<>
			<Draggable draggableId={id} index={index} key={id}>
				{(provided) => (
					<StyledTask
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						onClick={(event) => { handleOpenModal(event, 'detailsTask'); }}
					>
						<h3>{ title }</h3>
						<p>{description}</p>
						<FlexBox justifyContent='space-between' wrap='no-wrap'>
							<p>{`Owner: ${owner}`}</p>
							{owner && isOwn
								? <IconButton
									aria-label="delete"
									size="small"
									onClick={(event) => { handleOpenModal(event, 'deleteTask'); }}
								>
									<DeleteIcon fontSize='small'/>
								</IconButton>
								: null
							}
						</FlexBox>
					</StyledTask>
				)}
			</Draggable>
			<ModalWindow
				title={`Are you sure to delete the task "${title}"?`}
				description="This action cannot be undone"
				isOpened={deleteTaskModalState === id}
			>
				<Button onClick={handleCloseModals}>Cancel</Button>
				<Button onClick={handleDelete} variant='outlined' autoFocus>
            Delete
				</Button>
			</ModalWindow>
			<ModalWindow
				title={<ModalTitleNode
					closeFn={handleCloseModals}
					firstRow={`Task ID: ${id}`}
				/>}
				isOpened={detailsTaskModalState === id}
			>
				<TaskDetails
					title={title}
					description={description}
					users={users}
					handleDelete={handleDelete}
					handleUpdate={handleUpdate}
					boardUsers={boardUsers}
					userId={userId}
					isOwn={!!(isOwn && owner)}
				/>
			</ModalWindow>
		</>
	);
};

export default Task;
