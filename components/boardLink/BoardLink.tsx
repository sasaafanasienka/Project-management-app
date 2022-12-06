import {
	FC, ReactElement, SyntheticEvent,
} from 'react';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { toast } from 'react-toastify';
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
		cannotDelete,
		confirmationDeleteBoard,
		confirmationDescription,
		cancelBtn,
		deleteBtn,
		updateBoardHeader,
	} = useAppSelector((state) => state.lang.text);

	const {
		title, _id: id, invited, users,
	} = { ...props.board };
	const dispatch = useAppDispatch();

	const editBoardModalState = useAppSelector((state) => state.modals.editBoard);
	const deleteBoardModalState = useAppSelector((state) => state.modals.deleteBoard);

	const handleOpenModal = (event: SyntheticEvent, name: ModalNameModel) => {
		event.stopPropagation();
		event.preventDefault();
		if (invited) {
			toast.warn(cannotDelete);
		}
		if (!invited) {
			dispatch(openModal({ name, id }));
		}
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
							onClick={(event) => { handleOpenModal(event, 'editBoard'); }}>
							<InfoIcon fontSize='small' color='disabled' />
						</IconButton>
						<Tooltip
							title={invited ? cannotDelete : null} arrow placement='top'
							followCursor
						>
							<IconButton
								aria-label="delete"
								size="small"
								onClick={(event) => { handleOpenModal(event, 'deleteBoard'); }}>
								<DeleteIcon fontSize='small' color='disabled' />
							</IconButton>
						</Tooltip>
					</FlexBox>
					<span></span>
				</StyledBoardLink>
			</Link>
			<ModalWindow
				title={`${confirmationDeleteBoard} "${title}"?`}
				description={confirmationDescription}
				isOpened={deleteBoardModalState === id}
			>
				<Button onClick={handleCloseModals}>{cancelBtn}</Button>
				<Button onClick={handleDeleteBoard} variant='contained' autoFocus>
					{deleteBtn}
				</Button>
			</ModalWindow>
			<ModalWindow
				title={`${updateBoardHeader} "${title}"`}
				isOpened={editBoardModalState === id}
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
