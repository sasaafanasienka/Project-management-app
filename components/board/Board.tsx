import {
	FC, ReactElement, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import { Button, Breadcrumbs, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Link from 'next/link';
import Column from '../column/Column';
import FlexBox from '../styled/FlexBox';
import BoardPropsModel from './interfaces';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import {
	createColumn, getBoardColumns, updateColumn,
} from '../../redux/slices/columnSlice';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';
import NewColumnForm from '../newColumnForm/NewColumnForm';
import { ColumnModel } from '../../redux/slices/columnSlice/interfaces';
import {
	deleteWhileMoving, getTasksInBoard, pushWhileMoving, updateTask,
} from '../../redux/slices/tasksSlice';


const Board: FC<BoardPropsModel> = (): ReactElement => {
	const {
		navBoards, navHome, addColumnBtn, createColumnHeader,
	} = useAppSelector((state) => state.lang.text);

	const [isModalOpened, setIsModalOpened] = useState<ModalWindowStateModel>(false);

	const router = useRouter();
	const { boardid } = router.query;

	const tasks = useAppSelector((state) => state.tasks.boardTasks);
	const boards = useAppSelector((state) => state.boards);
	const columns = useAppSelector((state) => state.columns.columns);

	const currentBoard = boards.boards.find((el) => el._id === boardid);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (boardid) {
			dispatch(getBoardColumns({ boardId: boardid as string }));
			dispatch(getTasksInBoard({ boardId: boardid as string }));
		}
	}, [boardid, dispatch]);

	const handleModal = (value: boolean = !isModalOpened) => {
		setIsModalOpened(value);
	};
	// const handleSubmit = (formData: BoardModel) => {
	const handleSubmit = (formData: ColumnModel) => {
		if (formData) {
			const order = columns.length;
			dispatch(createColumn({ boardId: boardid as string, formData, order }))
				.then(() => {
					handleModal(false);
				});
		}
	};

	const handleDragEnd = (result: DropResult) => {
		const {
			destination, source, draggableId, type,
		} = result;
		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId
			&& destination.index === source.index) {
			return;
		}
		if (type === 'columns') {
			const colToUpdate = columns.filter((col) => col._id === draggableId);
			const newColsOrder = columns.slice();
			newColsOrder.splice(source.index, 1);
			newColsOrder.splice(destination.index, 0, ...colToUpdate);
			for (let i = 0; i <= newColsOrder.length - 1; i += 1) {
				dispatch(updateColumn({
					boardId: boardid as string,
					columnId: newColsOrder[i]._id,
					body: { title: newColsOrder[i].title, order: i },
				}));
			}
		}
		if (type === 'task') {
			if (destination.droppableId === source.droppableId) {
				const columnTasks = tasks[source.droppableId];
				const taskToUpdate = columnTasks.filter((task) => task._id === draggableId);
				const newTasksOrder = columnTasks.slice();
				newTasksOrder.splice(source.index, 1);
				newTasksOrder.splice(destination.index, 0, ...taskToUpdate);
				for (let i = 0; i <= newTasksOrder.length - 1; i += 1) {
					dispatch(updateTask({
						boardId: boardid as string,
						columnId: source.droppableId,
						taskId: newTasksOrder[i]._id,
						body: {
							title: newTasksOrder[i].title,
							description: newTasksOrder[i].description,
							columnId: newTasksOrder[i].columnId,
							order: i,
							userId: newTasksOrder[i].userId,
							users: newTasksOrder[i].users,
						},
					}));
				}
			} else {
				const sourceColumnTasks = (tasks[source.droppableId] || []).slice();
				const taskToUpdate = tasks[source.droppableId].filter((task) => task._id === draggableId);
				const destinationColumnTasks = (tasks[destination.droppableId] || []).slice();
				sourceColumnTasks.splice(source.index, 1);
				destinationColumnTasks.splice(destination.index, 0, ...taskToUpdate);
				dispatch(deleteWhileMoving({ sourceColumnId: source.droppableId, taskId: draggableId }));
				dispatch(pushWhileMoving({ destColumnId: destination.droppableId, task: taskToUpdate[0] }));
				for (let i = 0; i <= sourceColumnTasks.length - 1; i += 1) {
					dispatch(updateTask({
						boardId: boardid as string,
						columnId: source.droppableId,
						taskId: sourceColumnTasks[i]._id,
						body: {
							title: sourceColumnTasks[i].title,
							description: sourceColumnTasks[i].description,
							columnId: source.droppableId,
							order: i,
							userId: sourceColumnTasks[i].userId,
							users: sourceColumnTasks[i].users,
						},
					}));
				}
				for (let i = 0; i <= destinationColumnTasks.length - 1; i += 1) {
					if (destinationColumnTasks[i]._id === draggableId) {
						dispatch(updateTask({
							boardId: boardid as string,
							columnId: source.droppableId,
							taskId: destinationColumnTasks[i]._id,
							body: {
								title: destinationColumnTasks[i].title,
								description: destinationColumnTasks[i].description,
								columnId: destination.droppableId,
								order: i,
								userId: destinationColumnTasks[i].userId,
								users: destinationColumnTasks[i].users,
							},
						}));
					}
					dispatch(updateTask({
						boardId: boardid as string,
						columnId: destination.droppableId,
						taskId: destinationColumnTasks[i]._id,
						body: {
							title: destinationColumnTasks[i].title,
							description: destinationColumnTasks[i].description,
							columnId: destination.droppableId,
							order: i,
							userId: destinationColumnTasks[i].userId,
							users: destinationColumnTasks[i].users,
						},
					}));
				}
			}
		}
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<FlexBox column alignItems='left'>
					<Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ fontWeight: 700, fontSize: '20px' }}>
						<Link href="/">{navHome}</Link>
						<Link href="/boards">{navBoards}</Link>
						<Typography sx={{ fontWeight: 700, fontSize: '20px' }} color="text.primary">{currentBoard ? currentBoard.title : ''}</Typography>
					</Breadcrumbs>
					<FlexBox justifyContent='flex-end'>
						<Button
							color='secondary'
							aria-label="add-new"
							size="small"
							onClick={() => { handleModal(); }}
						>
							<AddIcon fontSize='small' color='secondary' /> {addColumnBtn}
						</Button>
					</FlexBox>
					<FlexBox
						justifyContent='flex-start'
						alignItems='flex-start'
						wrap='nowrap'
						width='max-content'
					>
						<Droppable droppableId='all-columns' direction='horizontal' type='columns' >
							{(provided) => (
								<FlexBox
									width='max-content'
									alignItems='stretch'
									{...provided.droppableProps}
									ref={provided.innerRef}
									justifyContent='left' wrap='no-wrap'>
									{(columns || []).map((column, index) => <Column
										title={column.title}
										id={column._id}
										key={column._id}
										index={index}
										boardId={boardid as string}
									/>)}
									{provided.placeholder}
								</FlexBox>
							)}
						</Droppable>
						<Button color='info' onClick={() => { handleModal(); }}>
							<FlexBox alignItems='center' justifyContent='center' gap='0'>
								<AddIcon fontSize='small' />
								{addColumnBtn}
							</FlexBox>
						</Button>
					</FlexBox>
				</FlexBox>
			</DragDropContext>
			<ModalWindow
				title={createColumnHeader}
				isOpened={isModalOpened}
				// closeFunc={() => { handleModal(); }}
			>
				<NewColumnForm onSubmit={handleSubmit} onClose={handleModal} />
			</ModalWindow>
		</>
	);
};

export default Board;
