import {
	FC, ReactElement, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Column from '../column/Column';
import { ColumnPropsModel } from '../column/interfaces';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';
import BoardPropsModel from './interfaces';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { createColumn, getBoardById, getBoardColumns, updateColumn } from '../../redux/slices/columnSlice';
import { getUserBoards } from '../../redux/slices/boardSlice';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';
import NewColumnForm from '../newColumnForm/NewColumnForm';
import { ColumnModel } from '../../redux/slices/columnSlice/interfaces';


const Board: FC<BoardPropsModel> = (): ReactElement => {
	const [isModalOpened, setIsModalOpened] = useState<ModalWindowStateModel>(false);

	const router = useRouter();
	const { boardid } = router.query;

	const boards = useAppSelector((state) => state.boards);
	const columns = useAppSelector((state) => state.columns.columns);

	const [colsToDisplay, setColsToDisplay] = useState<ColumnModel[]>(columns);

	useEffect(() => {
		if (columns.length) {
			const newOrder = columns.slice().sort((a, b) => a.order - b.order);
			setColsToDisplay(newOrder);
		}
	}, [columns]);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getBoardColumns(boardid as string));
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
			for (let i = 0; i < newColsOrder.length - 1; i += 1) {
				console.log(newColsOrder[i]);
				dispatch(updateColumn({
					boardid,
					columnId: newColsOrder[i]._id,
					body: { title: newColsOrder[i].title, order: i },
				}));
			}
			console.log(newColsOrder);
		}
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<PageHeading text='Boards > Board name'></PageHeading>
				<FlexBox justifyContent='flex-start' alignItems='flex-start' wrap='nowrap'>
					<Droppable droppableId='all-columns' direction='horizontal' type='columns' >
						{(provided) => (
							<FlexBox
								alignItems='stretch'
								{...provided.droppableProps}
								ref={provided.innerRef}
								justifyContent='left' wrap='no-wrap'>
								{(colsToDisplay || []).map((column, index) => <Column
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
