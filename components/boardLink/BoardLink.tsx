import {
	FC, ReactElement, useState, MouseEvent,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import StyledBoardLink from './StyledBoardLink';
import { BoardLinkPropsModel } from './interfaces';
import FlexBox from '../styled/FlexBox';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';
import { useAppDispatch } from '../../redux/store';
import { deleteBoard, updateBoard } from '../../redux/slices/boardSlice';
import NewBoardForm from '../newBoardForm/NewBoardForm';
import { BoardModel } from '../../redux/slices/boardSlice/interfaces';


const BoardLink: FC<BoardLinkPropsModel> = (props): ReactElement => {
	const {
		title, _id: id, invited, users,
	} = { ...props.board };
	const dispatch = useAppDispatch();

	const [isDeleteModalOpened, setDeleteModalOpened] = useState<ModalWindowStateModel>(false);
	const [isEditModalOpened, setEditModalOpened] = useState<boolean>(false);

	const openDeleteModal = (event: MouseEvent): void => {
		event.preventDefault();
		setDeleteModalOpened(true);
	};

	const closeDeleteModal = (): void => {
		setDeleteModalOpened(false);
	};

	const handleDeleteBoard = (): void => {
		dispatch(deleteBoard({ boardId: id }))
			.unwrap()
			.then(() => {
				toast.success(`Board ${title} has been successfully deleted`);
				closeDeleteModal();
			})
			.catch((error) => toast.error(`An error has occured: ${error}`));
	};

	const openEditModal = (event: MouseEvent): void => {
		event.preventDefault();
		setEditModalOpened(true);
	};

	const closeEditModal = (): void => {
		setEditModalOpened(false);
	};

	const handleUpdate = (data: BoardModel) => {
		dispatch(updateBoard({ boardId: id, body: data }))
			.unwrap()
			.then((responseData) => {
				toast.success(`The Board "${responseData.title}" was successfully updated`);
				console.log(responseData);
				closeEditModal();
			})
			.catch((error) => toast.error(`An error has occured: ${error}`));
	};

	return (
		<>
			<Link href={`/boards/${id}`}>
				<StyledBoardLink owned={invited}>
					<h3>{ title }</h3>
					<FlexBox justifyContent='flex-end' gap='0'>
						<IconButton aria-label="delete" size="small" onClick={openEditModal}>
							<EditIcon fontSize='small' color='disabled' />
						</IconButton>
						<IconButton aria-label="delete" size="small" onClick={openDeleteModal}>
							<DeleteIcon fontSize='small' color='disabled' />
						</IconButton>
					</FlexBox>
					<span></span>
				</StyledBoardLink>
			</Link>
			<ModalWindow
				title={`Are you sure to delete the board "${title}"?`}
				description="This action cannot be undone"
				isOpened={isDeleteModalOpened}
				closeFunc={closeDeleteModal}
			>
				<Button onClick={closeDeleteModal}>Cancel</Button>
				<Button onClick={handleDeleteBoard} variant='contained' autoFocus>
            Delete
				</Button>
			</ModalWindow>
			<ModalWindow
				title={`Udpate Board "${title}"`}
				isOpened={isEditModalOpened}
				closeFunc={closeEditModal}
			>
				<NewBoardForm
					updateMode={{ assignedUsers: users, currentTitle: title }}
					onSubmit={handleUpdate}
					onClose={closeEditModal} />
			</ModalWindow>
		</>
	);
};

export default BoardLink;
