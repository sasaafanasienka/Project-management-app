import {
	FC, ReactElement, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from '../column/Column';
import { ColumnPropsModel } from '../column/interfaces';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';
import BoardPropsModel from './interfaces';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { createColumn, getBoardById } from '../../redux/slices/columnSlice';
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
	const columns = useAppSelector((state) => state.columns.columns.filter(
		(column) => column.boardId === boardid,
	));

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserBoards())
			.then(
				() => {
					dispatch(getBoardById(boardid));
				},
			);
	}, [dispatch, boardid]);

	const handleModal = (event, value: boolean = !isModalOpened) => {
		setIsModalOpened(value);
	};
	// const handleSubmit = (formData: BoardModel) => {
	const handleSubmit = (formData: ColumnModel) => {
		if (formData) {
			dispatch(createColumn({ boardid, formData }))
				.then(() => {
					handleModal(false);
				});
		}
	};

	const handleDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId
			&& destination.index === source.index) {
			return;
		}
		console.log(destination, source, draggableId);
	};

	return (
		<>
			<DragDropContext onDragEnd={handleDragEnd}>
				<PageHeading text='Boards > Board name'></PageHeading>
				<FlexBox justifyContent='flex-start' alignItems='flex-start' wrap='nowrap'>
					{columns.map((column) => <Column
						title={column.title} id={column.id} tasks={column.tasks} key={column.title} />)}
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
