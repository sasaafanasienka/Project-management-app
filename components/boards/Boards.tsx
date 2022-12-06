/* eslint-disable no-underscore-dangle */
import {
	FC, ReactElement, useEffect, useState,
} from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';
import { createBoard, getUserBoards } from '../../redux/slices/boardSlice';
import { BoardModel, BoardUserModel } from '../../redux/slices/boardSlice/interfaces';
import { getAllUsers } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import AddBoard from '../addBoard/AddBoard';
import BoardLink from '../boardLink/BoardLink';
import ModalWindow from '../modal/ModalWindow';
import NewBoardForm from '../newBoardForm/NewBoardForm';
import FlexBox from '../styled/FlexBox';
import BoardFilterBar from './boardFilterBar/BoardFilterBar';

const Boards: FC = (): ReactElement => {
	const {
		navBoards, navHome, addBoardBtn, createBoardHeader,
	} = useAppSelector((state) => state.lang.text);


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
				.then(() => {
					handleModal();
				});
		}
	};

	const handleFilterBoards = (option: string) => {
		switch (option) {
		case 'all':
			setBoardsToDisplay(boards);
			break;
		case 'own':
			setBoardsToDisplay(boards.filter((board) => !board.invited));
			break;
		case 'guest':
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
			<Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ fontWeight: 700, fontSize: '20px' }}>
				<Link href="/">{navHome}</Link>
				<Typography sx={{ fontWeight: 700, fontSize: '20px' }} color="text.primary">{navBoards}</Typography>
			</Breadcrumbs>
			<FlexBox justifyContent='space-between'>
				<BoardFilterBar onChange={handleFilterBoards} />
				<Button color='secondary' aria-label="add-new" size="small" onClick={handleModal}>
					<AddIcon fontSize='small' color='secondary' /> {addBoardBtn}
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
				title={createBoardHeader}
				isOpened={isModalOpened}
				// closeFunc={handleModal}
			>
				<NewBoardForm onSubmit={handleSubmit} onClose={handleModal} />
			</ModalWindow>
		</FlexBox>
	);
};

export default Boards;
