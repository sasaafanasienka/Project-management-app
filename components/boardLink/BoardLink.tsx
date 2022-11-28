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
import ModalTitleNode from '../modal/modalTitleNode/ModalTitleNode';
import ModalDetailsUpdate from '../modal/modalDetailsUpdate/modalDetailsUpdate';


const BoardLink: FC<BoardLinkPropsModel> = (props): ReactElement => {
	const { title, _id: id, invited } = { ...props.board };

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
				<Button onClick={deleteBoard} variant='contained' autoFocus>
            Delete
				</Button>
			</ModalWindow>
			<ModalWindow
				title={<ModalTitleNode
					firstRow={`Board ID: ${id}`}
					closeFn={closeEditModal}
					secondRow={`Owner: ${props.board.owner}`}
				/>}
				isOpened={isEditModalOpened}
				closeFunc={closeEditModal}
			>
				<ModalDetailsUpdate title={props.board.title} users={props.board.users}>
					<FlexBox justifyContent='right'>
						<Button onClick={closeEditModal}>Cancel</Button>
						<Button color='info' onClick={deleteBoard} variant='contained' autoFocus>
								Update
						</Button>
					</FlexBox>
				</ModalDetailsUpdate>
			</ModalWindow>
		</>
	);
};

export default BoardLink;
