import {
	FC, ReactElement, SyntheticEvent,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Link from 'next/link';
import StyledBoardLink from './StyledBoardLink';
import { BoardLinkPropsModel } from './interfaces';
import FlexBox from '../styled/FlexBox';
import ModalWindow from '../modal/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteBoard, updateBoard } from '../../redux/slices/boardSlice';
import NewBoardForm from '../newBoardForm/NewBoardForm';
import { BoardModel } from '../../redux/slices/boardSlice/interfaces';
import { closeModals, openModal } from '../../redux/slices/modalsSlice';
import { ModalNameModel } from '../../redux/slices/modalsSlice/interfaces';


const BoardLink: FC<BoardLinkPropsModel> = (props): ReactElement => {
	const {
		title, _id: id, invited, users,
	} = { ...props.board };
	const dispatch = useAppDispatch();

	const editBoardModalState = useAppSelector((state) => state.modals.editBoard);
	const deleteBoardModalState = useAppSelector((state) => state.modals.deleteBoard);

	const handleOpenModal = (event: SyntheticEvent, name: ModalNameModel) => {
		event.stopPropagation();
		event.preventDefault();
		dispatch(openModal(name));
	};

	const handleCloseModals = () => {
		dispatch(closeModals());
	};

	const handleDeleteBoard = (): void => {
		dispatch(deleteBoard({ boardId: id }))
			.unwrap()
			.then(() => {
				dispatch(closeModals());
			});
	};

	const handleUpdate = (data: BoardModel) => {
		dispatch(updateBoard({ boardId: id, body: data }))
			.unwrap()
			.then(() => {
				dispatch(closeModals());
			});
	};

	return (
		<>
			<Link href={`/boards/${id}`}>
				<StyledBoardLink owned={invited}>
					<h3>{ title }</h3>
					<FlexBox justifyContent='flex-end' gap='0'>
						<IconButton
							aria-label="delete"
							size="small"
							onClick={(event) => { handleOpenModal(event, 'deleteBoard'); }}>
							<EditIcon fontSize='small' color='disabled' />
						</IconButton>
						<IconButton
							aria-label="delete"
							size="small"
							onClick={(event) => { handleOpenModal(event, 'editBoard'); }}>
							<DeleteIcon fontSize='small' color='disabled' />
						</IconButton>
					</FlexBox>
					<span></span>
				</StyledBoardLink>
			</Link>
			<ModalWindow
				title={`Are you sure to delete the board "${title}"?`}
				description="This action cannot be undone"
				isOpened={deleteBoardModalState}
			>
				<Button onClick={handleCloseModals}>Cancel</Button>
				<Button onClick={handleDeleteBoard} variant='contained' autoFocus>
            Delete
				</Button>
			</ModalWindow>
			<ModalWindow
				title={`Udpate Board "${title}"`}
				isOpened={editBoardModalState}
			>
				<NewBoardForm
					updateMode={{ assignedUsers: users, currentTitle: title }}
					onSubmit={handleUpdate}
					onClose={handleCloseModals} />
			</ModalWindow>
		</>
	);
};

export default BoardLink;
