/* eslint-disable no-underscore-dangle */
import { Button } from '@mui/material';
import {
	FC, ReactElement, useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { createBoard, getUserBoards } from '../../redux/slices/boardSlice';
import { BoardModel, BoardUserModel } from '../../redux/slices/boardSlice/interfaces';
import { getAllUsers } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import AddBoard from '../addBoard/AddBoard';
import BoardLink from '../boardLink/BoardLink';
import ModalWindow from '../modal/ModalWindow';
import NewBoardForm from '../newBoardForm/NewBoardForm';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';
import BoardFilterBar from './boardFilterBar/BoardFilterBar';
import { FilterOptionsModel } from './boardFilterBar/interfaces';

const Boards: FC = (): ReactElement => {
	const dispatch = useAppDispatch();
	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
	const boards = useAppSelector((state) => state.boards.boards);
	const [boardsToDisplay, setBoardsToDisplay] = useState<Array<BoardUserModel>>(boards);

	useEffect(() => {
		setBoardsToDisplay(boards);
	}, [boards]);

	const handleModal = isModalOpened
		? () => setIsModalOpened(false)
		: () => setIsModalOpened(true);

	const handleSubmit = (formData: BoardModel) => {
		if (formData) {
			dispatch(createBoard(formData))
				.unwrap()
				.then(({ title }) => {
					toast.success(`Board "${title}" successfully created`);
					handleModal();
				})
				.catch((err) => toast.error(`An error has occured: ${err}`));
		}
	};

	const handleFilterBoards = (option: FilterOptionsModel) => {
		console.log(boards, boardsToDisplay);
		switch (option) {
		case FilterOptionsModel.all:
			setBoardsToDisplay(boards);
			break;
		case FilterOptionsModel.own:
			setBoardsToDisplay(boards.filter((board) => !board.invited));
			break;
		case FilterOptionsModel.guest:
			setBoardsToDisplay(boards.filter((board) => board.invited));
			break;
		default:
			setBoardsToDisplay(boards);
		}
	};

	useEffect(() => {
		dispatch(getUserBoards()).then(() => dispatch(getAllUsers()));
	}, [dispatch]);

	return (
		<FlexBox column alignItems='left'>
			<PageHeading text="Boards"></PageHeading>
			<FlexBox justifyContent='space-between'>
				<BoardFilterBar onChange={handleFilterBoards} />
				<Button color='secondary' aria-label="add-new" size="small" onClick={handleModal}>
					<AddIcon fontSize='small' color='secondary' /> Add Board
				</Button>
			</FlexBox>
			<FlexBox justifyContent='flex-start' alignItems='stretch'>
				{boardsToDisplay.map((el) => (
					<BoardLink
						board={el}
						key={el._id}
					/>
				))}
				<AddBoard onClick={handleModal} />
			</FlexBox>
			<ModalWindow
				title={'Create new Board'}
				isOpened={isModalOpened}
				closeFunc={handleModal}
			>
				<NewBoardForm onSubmit={handleSubmit} onClose={handleModal} />
			</ModalWindow>
		</FlexBox>
	);
};

export default Boards;
