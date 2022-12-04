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
import { getTasksInBoard, updateTask } from '../../redux/slices/tasksSlice';


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
		dispatch(getBoardColumns(boardid as string));
		dispatch(getTasksInBoard(boardid as string));
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
				console.log(columnTasks);
				const taskToUpdate = columnTasks.filter((task) => task._id === draggableId);
				const newTasksOrder = columnTasks.slice();
				newTasksOrder.splice(source.index, 1);
				newTasksOrder.splice(destination.index, 0, ...taskToUpdate);
				console.log(newTasksOrder);
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
			}
			// console.log(destination, source, draggableId);
		}
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<FlexBox column alignItems='left'>
					<PageHeading
						text={`Boards > ${currentBoard ? currentBoard.title : ''}`}
					/>
					<FlexBox justifyContent='flex-end'>
						<Button color='secondary' aria-label="add-new" size="small" onClick={handleModal}>
							<AddIcon fontSize='small' color='secondary' /> Add new Column
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
