import {
	FC, ReactElement, useState, ChangeEvent, useEffect,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
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
import StyledTaskList from './StyledTaskList';
import StyledColumnTitle from './StyledColumnTitle';
import UpdateTitleInput from './updateTitleInput/UpdateTitleInput';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteColumn, updateColumn } from '../../redux/slices/columnSlice';
import { createTask, getTasksInColumn } from '../../redux/slices/tasksSlice';
import NewTaskForm from '../newTaskForm/NewTaskForm';
import { CreateTaskBodyModel } from '../../redux/slices/tasksSlice/interfaces';

const Column: FC<ColumnPropsModel> = (props): ReactElement => {
	const {
		title, index, id, boardId,
	} = { ...props };

	const tasks = useAppSelector((state) => state.tasks.tasks.filter(
		(task) => task.columnId === id,
	));

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getTasksInColumn({ boardid: boardId, columnId: id }));
	}, []);

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

	const handleDelModal = (value: boolean = !isDelModalOpened) => {
		setDelModalOpened(value);
	};

	const handleCreateModal = (value: boolean = !isCreateModalOpened) => {
		setCreateModalOpened(value);
	};

	const toggleDelModal = () => {
		handleDelModal(!isDelModalOpened);
	};

	const toggleCreateModal = () => {
		handleDelModal(!isCreateModalOpened);
	};

	const deleteItem = () => {
		dispatch(deleteColumn({ boardId, columnId: id }))
			.then(() => {
				handleDelModal(false);
			});
	};

	const handleSubmit = (formData: CreateTaskBodyModel) => {
		if (formData) {
			dispatch(createTask({ boardId, columnId: id, formData }))
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
										{tasks.length && <span>{tasks.length}</span>}
									</h3>
								</StyledColumnTitle>
							}
							<IconButton
								aria-label="delete"
								size="small"
								onClick={toggleDelModal}>
								<DeleteIcon fontSize='small'/>
							</IconButton>
						</FlexBox>
						<Button
							color='info'
							onClick={toggleCreateModal}>
							<FlexBox alignItems='center' justifyContent='center' gap='0'>
								<AddIcon fontSize='small' />
							Add new task
							</FlexBox>
						</Button>
						<Droppable droppableId={id} type='task' key={id}>
							{(provided) => (
								<StyledTaskList
									ref={provided.innerRef}
									{...provided.droppableProps}
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
				<Button onClick={toggleDelModal}>Cancel</Button>
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
					boardId={boardId}
				/>
			</ModalWindow>
		</>
	);
};

export default Column;
