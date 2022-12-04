import {
	FC, ReactElement, useState, useRef, ChangeEvent, useEffect,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import FlexBox from '../styled/FlexBox';
import StyledColumn from './StyledColumn';
import Task from '../task/Task';
import ModalWindow from '../modal/ModalWindow';
import { ColumnPropsModel } from './interfaces';
import { ModalWindowStateModel } from '../modal/interfaces';
import { ItemTypes } from '../board/interfaces';
import StyledTaskList from './StyledTaskList';
import StyledColumnTitle from './StyledColumnTitle';
import UpdateTitleInput from './updateTitleInput/UpdateTitleInput';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteColumn, updateColumn } from '../../redux/slices/columnSlice';
import { createTask, getTasksInBoard, getTasksInColumn } from '../../redux/slices/tasksSlice';
import NewTaskForm from '../newTaskForm/NewTaskForm';
import { TaskModel } from '../../redux/slices/tasksSlice/interfaces';

const Column: FC<ColumnPropsModel> = (props): ReactElement => {
	const {
		title, index, id, boardId,
	} = { ...props };

	// const tasks = useAppSelector((state) => state.tasks.tasks.filter(
	// 	(task) => task.columnId === id,
	// ));

	const columnTasks = useAppSelector((state) => state.tasks.boardTasks)[id] || [];

	const dispatch = useAppDispatch();

	useEffect(() => {
		// dispatch(getTasksInColumn({ boardid: boardId, columnId: id }));
		dispatch(getTasksInBoard({ boardId }));
	}, [boardId, dispatch]);

	const [isDelModalOpened, setDelModalOpened] = useState<ModalWindowStateModel>(false);
	const [isCreateModalOpened, setCreateModalOpened] = useState<ModalWindowStateModel>(false);
	const [isTitleUpdate, setIsTitleUpdate] = useState<boolean>(false);
	const [titleCurrent, setTitleCurrent] = useState<string>(title);

	const handleTitleUpdateConfirm = () => {
		dispatch(updateColumn({
			boardId,
			columnId: id,
			body: {
				title: titleCurrent,
				order: index,
			},
		}));
		setIsTitleUpdate(false);
	};

	const handleTitleUpdateCancel = () => {
		setIsTitleUpdate(false);
	};

	const handleTitleUpdateChange = (e: ChangeEvent) => {
		const target = e.target as HTMLTextAreaElement;
		setTitleCurrent(target.value);
	};

	const handleDelModal = (event, value: boolean = !isDelModalOpened) => {
		setDelModalOpened(value);
	};

	const handleCreateModal = (event, value: boolean = !isCreateModalOpened) => {
		setCreateModalOpened(value);
	};

	const deleteItem = () => {
		dispatch(deleteColumn({ boardId, columnId: id }))
			.then(() => {
				handleDelModal(false);
			});
	};

	const handleSubmit = (formData: TaskModel) => {
		if (formData) {
			dispatch(createTask({
				boardid: boardId, columnId: id, formData, order: columnTasks.length,
			}))
				.unwrap()
				.then(() => {
					handleCreateModal();
				});
		}
	};

	return (
		<>
			<Draggable draggableId={id} index={index} key={id}>
				{({ draggableProps, dragHandleProps, innerRef }) => (
					<StyledColumn {...draggableProps} ref={innerRef}>
						<FlexBox justifyContent='space-between' wrap='no-wrap'>
							<div {...dragHandleProps}>
								<IconButton aria-label="drag" size="medium">
									<DragIndicatorIcon />
								</IconButton>
							</div>
							{isTitleUpdate
								? <UpdateTitleInput
									value={titleCurrent}
									onChange={handleTitleUpdateChange}
									onConfirm={handleTitleUpdateConfirm}
									onCancel={handleTitleUpdateCancel}
								/>
								: <StyledColumnTitle onClick={() => setIsTitleUpdate(true)}>
									<EditIcon color='secondary' />
									<h3>
										{title.toUpperCase()}
										{(columnTasks || []).length && <span>{(columnTasks || []).length}</span>}
									</h3>
								</StyledColumnTitle>
							}
							<IconButton aria-label="delete" size="small" onClick={handleDelModal}>
								<DeleteIcon fontSize='small'/>
							</IconButton>
						</FlexBox>
						<Button color='info' onClick={handleCreateModal}>
							<FlexBox alignItems='center' justifyContent='center' gap='0'>
								<AddIcon fontSize='small' />
							Add new task
							</FlexBox>
						</Button>
						{/* <StyledTaskList
						>
							{tasks.map((task, idx) => <Task
								key={task._id}
								index={idx}
								description={task.description}
								id={task._id}
								columnId={task.columnId}
								userId={task.userId}
								users={task.users}
								boardid={task.boardId}
								order={task.order}
								title={task.title}
							/>)}
						</StyledTaskList> */}
						<Droppable droppableId={id} type='task' key={id}>
							{(provided) => (
								<StyledTaskList
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									{(columnTasks || []).map((task, idx) => <Task
										key={task._id}
										index={idx}
										description={task.description}
										id={task._id}
										columnId={task.columnId}
										userId={task.userId}
										users={task.users}
										boardid={task.boardId}
										order={task.order}
										title={task.title}
									/>)}
									{provided.placeholder}
								</StyledTaskList>
							)}
						</Droppable>
					</StyledColumn>
				)}
			</Draggable>

			<ModalWindow
				title={`Are you sure to delete the column "${title}"?`}
				description="This action cannot be undone"
				isOpened={isDelModalOpened}
				closeFunc={handleDelModal}
			>
				<Button onClick={handleDelModal}>Cancel</Button>
				<Button onClick={deleteItem} variant='contained' autoFocus>
            Delete
				</Button>
			</ModalWindow>
			<ModalWindow
				title={'Create new Column'}
				isOpened={isCreateModalOpened}
				closeFunc={handleCreateModal}
			>
				<NewTaskForm
					onSubmit={handleSubmit}
					onClose={handleCreateModal}
					boardid={boardId} />
			</ModalWindow>
		</>
	);
};

export default Column;
