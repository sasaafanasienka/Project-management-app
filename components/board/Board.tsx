import {
	FC, ReactElement, useEffect, useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deepCopy } from 'deep-copy-ts';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import Column from '../column/Column';
import { ColumnPropsModel } from '../column/interfaces';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';
import mockData from './mockData';
import BoardPropsModel from './interfaces';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { createColumn, getBoardById, getColumns } from '../../redux/slices/columnSlice';
import { getUserBoards } from '../../redux/slices/boardSlice';
import { getAllUsers } from '../../redux/slices/userSlice';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';
import NewBoardForm from '../newBoardForm/NewBoardForm';
import NewColumnForm from '../newColumnForm/NewColumnForm';
import { ColumnModel } from '../../redux/slices/columnSlice/interfaces';


const Board: FC<BoardPropsModel> = (props): ReactElement => {
	const [isModalOpened, setIsModalOpened] = useState<ModalWindowStateModel>(false);

	const router = useRouter();
	const { boardid } = router.query;

	const boards = useAppSelector((state) => state.boards);
	const columns = useAppSelector((state) => state.columns.columns);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserBoards())
			.then(
				(res) => {
					console.log(boardid);
					console.log(res.payload.findIndex((el) => el._id === boardid));
					if (res.payload.findIndex((el) => el._id === boardid) >= 0) {
						dispatch(getBoardById(boardid));
					} else {
						console.log(404);
						// router.push('404');
					}
				},
			);
	}, [dispatch, boardid]);


	const moveColumn = (dragId: number, hoverId: number): void => {

	};

	const moveTaskInColumn = (
		dragId: string,
		hoverId: string,
		dragColumnId: string,
	): void => {

	};

	const moveTaskBetweenColumns = (
		dragId: string,
		hoverId: string,
		dragColumnId: string,
		hoverColumnId: string,
	): void => {

	};

	const moveTask = (
		dragId: string,
		hoverId: string,
		dragColumnId: string,
		hoverColumnId: string,
	): void => {

	};

	const moveIntoEmptyColumn = (dragId: string, dragColumnId: string, hoverColumnId: string) => {

	};

	const handleModal = (value: boolean = !isModalOpened) => {
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
	console.log(columns);

	const renderColumn = (column: ColumnPropsModel, index: number) => (
		<Column
			boardid={boardid}
			id={column._id}
			index={index}
			key={column.title}
			title={column.title}
			moveColumn={moveColumn}
			moveTask={moveTask}
			moveIntoEmptyColumn={moveIntoEmptyColumn}
			tasks={column.tasks}
		/>
	);

	return (
		<>
			<DndProvider backend={HTML5Backend}>
				<PageHeading text='Boards > Board name'></PageHeading>
				<FlexBox justifyContent='flex-start' alignItems='stretch' wrap='nowrap'>
					{columns.map((column, index) => renderColumn(column, index))}
					<Button color='info' onClick={handleModal}>
						<FlexBox alignItems='center' justifyContent='center' gap='0'>
							<AddIcon fontSize='small' />
						Add new column
						</FlexBox>
					</Button>
				</FlexBox>
			</DndProvider>
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
