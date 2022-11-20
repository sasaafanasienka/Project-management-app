import {
	FC, ReactElement, useState, MouseEvent,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Link from 'next/link';
import StyledBoardLink from './StyledBoardLink';
import { BoardLinkPropsModel } from './interfaces';
import FlexBox from '../styled/FlexBox';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';


const BoardLink: FC<BoardLinkPropsModel> = (props): ReactElement => {
	const { title, description } = { ...props };

	const [isOpened, setOpened] = useState<ModalWindowStateModel>(false);

	const openModal = (event: MouseEvent): void => {
		event.preventDefault();
		setOpened(true);
	};

	const closeModal = (): void => {
		setOpened(false);
	};

	const deleteBoard = (): void => {
		closeModal();
	};

	return (
		<>
			<Link href="/boards/111">
				<StyledBoardLink>
					<h3>{ title }</h3>
					<p>{description}</p>
					<FlexBox justifyContent='flex-end'>
						<IconButton aria-label="delete" size="small" onClick={openModal}>
							<DeleteIcon fontSize='small'/>
						</IconButton>
					</FlexBox>
				</StyledBoardLink>
			</Link>
			<ModalWindow
				title={`Are you sure to delete the board "${title}"?`}
				description="This action cannot be undone"
				isOpened={isOpened}
				closeFunc={closeModal}
			>
				<Button onClick={closeModal}>Cancel</Button>
				<Button onClick={deleteBoard} variant='contained' autoFocus>
            Delete
				</Button>
			</ModalWindow>
		</>
	);
};

export default BoardLink;
