import {
	FC, ReactElement, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Column from '../column/Column';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';
import BoardPropsModel from './interfaces';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import {
	createColumn, getBoardById, getBoardColumns, updateColumn,
} from '../../redux/slices/columnSlice';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';
import NewColumnForm from '../newColumnForm/NewColumnForm';
import { ColumnModel } from '../../redux/slices/columnSlice/interfaces';
import { deleteWhileMoving, getTasksInBoard, pushWhileMoving, updateTask } from '../../redux/slices/tasksSlice';


const Board: FC<BoardPropsModel> = (): ReactElement => {
	const [isModalOpened, setIsModalOpened] = useState<ModalWindowStateModel>(false);

	const router = useRouter();
	const { boardid } = router.query;

	const tasks = useAppSelector((state) => state.tasks.boardTasks);
	const boards = useAppSelector((state) => state.boards);
	const columns = useAppSelector((state) => state.columns.columns);

	const currentBoard = boards.boards.find((el) => el._id === boardid);

	// const [colsToDisplay, setColsToDisplay] = useState<ColumnModel[]>(columns);

	// useEffect(() => {
	// 	if (columns.length) {
	// 		const newOrder = columns.slice().sort((a, b) => a.order - b.order);
	// 		setColsToDisplay(newOrder);
	// 	}
	// }, [columns]);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (boardid) {
			dispatch(getBoardColumns(boardid as string));
			dispatch(getTasksInBoard(boardid as string));
		}
	}, [boardid, dispatch]);

	// useEffect(() => {
	// 	dispatch(getUserBoards())
	// 		.then(
	// 			() => {
	// 				dispatch(getBoardById(boardid));
	// 			},
	// 		);
	// }, [dispatch, boardid]);

	const handleModal = (event, value: boolean = !isModalOpened) => {
		setIsModalOpened(value);
	};
	// const handleSubmit = (formData: BoardModel) => {
	const handleSubmit = (formData: ColumnModel) => {
		if (formData) {
			const order = columns.length;
			dispatch(createColumn({ boardid, formData, order }))
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
					boardId: boardid,
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
						boardId: boardid,
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
				const column = columns.filter((col) => col._id === source.droppableId);
				const taskToUpdate = tasks[source.droppableId].filter((task) => task._id === draggableId);
				const destinationColumnTasks = (tasks[destination.droppableId] || []).slice();
				sourceColumnTasks.splice(source.index, 1);
				destinationColumnTasks.splice(destination.index, 0, ...taskToUpdate);
				dispatch(deleteWhileMoving({ sourceColumnId: source.droppableId, taskId: draggableId }));
				dispatch(pushWhileMoving({ destColumnId: destination.droppableId, task: taskToUpdate[0] }));
				for (let i = 0; i <= sourceColumnTasks.length - 1; i += 1) {
					dispatch(updateTask({
						boardid,
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
							boardid,
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
						boardid,
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
				<PageHeading
					text={`Boards > ${currentBoard ? currentBoard.title : ''}`}
				/>
				<FlexBox justifyContent='flex-start' alignItems='flex-start' wrap='nowrap'>
					<Droppable droppableId='all-columns' direction='horizontal' type='columns' >
						{(provided) => (
							<FlexBox
								alignItems='stretch'
								{...provided.droppableProps}
								ref={provided.innerRef}
								justifyContent='left' wrap='no-wrap'>
								{(columns || []).map((column, index) => <Column
									title={column.title}
									id={column._id}
									key={column._id}
									index={index}
									boardId={boardid}
								/>)}
								{provided.placeholder}
							</FlexBox>
						)}
					</Droppable>
					<Button color='info' onClick={handleModal}>
						<FlexBox alignItems='center' justifyContent='center' gap='0'>
							<AddIcon fontSize='small' />
						Add new column
						</FlexBox>
					</Button>
				</FlexBox>
			</DragDropContext>
			<ModalWindow
				title={'Create new Column'}
				isOpened={isModalOpened}
				closeFunc={handleModal}
			>
				<NewColumnForm onSubmit={handleSubmit} onClose={handleModal} />
			</ModalWindow>
		</>
	);
};

export default Board;
