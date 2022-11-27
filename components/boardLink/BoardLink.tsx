import {
	FC, ReactElement, useState, MouseEvent,
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
import { ModalWindowStateModel } from '../modal/interfaces';


const BoardLink: FC<BoardLinkPropsModel> = (props): ReactElement => {
	const { title, _id: id } = { ...props.board };

	const [isDeleteModalOpened, setDeleteModalOpened] = useState<ModalWindowStateModel>(false);
	const [isEditModalOpened, setEditModalOpened] = useState<boolean>(false);

	const openDeleteModal = (event: MouseEvent): void => {
		event.preventDefault();
		setDeleteModalOpened(true);
	};

	const closeDeleteModal = (): void => {
		setDeleteModalOpened(false);
	};

	const deleteBoard = (): void => {
		closeDeleteModal();
	};

	const openEditModal = (event: MouseEvent): void => {
		event.preventDefault();
		setEditModalOpened(true);
	};

	const closeEditModal = (): void => {
		setEditModalOpened(false);
	};

	return (
		<>
			<Link href={`/boards/${id}`}>
				<StyledBoardLink>
					<h3>{ title }</h3>
					<FlexBox justifyContent='flex-end' gap='0'>
						<IconButton aria-label="delete" size="small" onClick={openEditModal}>
							<EditIcon fontSize='small' color='disabled' />
						</IconButton>
						<IconButton aria-label="delete" size="small" onClick={openDeleteModal}>
							<DeleteIcon fontSize='small' color='disabled' />
						</IconButton>
					</FlexBox>
				</StyledBoardLink>
			</Link>
			<ModalWindow
				title={`Are you sure to delete the board "${title}"?`}
				description="This action cannot be undone"
				isOpened={isDeleteModalOpened}
				closeFunc={closeDeleteModal}
			>
				<Button onClick={closeDeleteModal}>Cancel</Button>
				<Button onClick={deleteBoard} variant='contained' autoFocus>
            Delete
				</Button>
			</ModalWindow>
			<ModalWindow
				title={`Edit board "${title}"?`}
				description="This action cannot be undone"
				isOpened={isEditModalOpened}
				closeFunc={closeEditModal}
			>
				<Button onClick={closeEditModal}>Cancel</Button>
				<Button onClick={deleteBoard} variant='contained' autoFocus>
            Delete
				</Button>
			</ModalWindow>
		</>
	);
};

export default BoardLink;
