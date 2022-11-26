import {
	FC, ReactElement, useState, useRef,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import type { Identifier, XYCoord } from 'dnd-core';
import { Button } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import FlexBox from '../styled/FlexBox';
import { TaskPropsModel } from './interfaces';
import StyledTask from './StyledTask';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';

const Task: FC<TaskPropsModel> = (props): ReactElement => {
	const {
		title, description, id, index, columnId, columnIndex,
	} = { ...props };

	const [isOpened, setOpened] = useState<ModalWindowStateModel>(false);

	const openModal = () => {
		setOpened(true);
	};

	const closeModal = () => {
		setOpened(false);
	};

	const deleteTask = () => {
		closeModal();
	};

	return (
		<>
			<StyledTask
				draggable="true"
			>
				<h3>{ title }</h3>
				<p>{description}</p>
				<FlexBox justifyContent='flex-end'>
					<IconButton aria-label="delete" size="small" onClick={openModal}>
						<DeleteIcon fontSize='small'/>
					</IconButton>
				</FlexBox>
			</StyledTask>
			<ModalWindow
				title={`Are you sure to delete the task "${title}"?`}
				description="This action cannot be undone"
				isOpened={isOpened}
				closeFunc={closeModal}
			>
				<Button onClick={closeModal}>Cancel</Button>
				<Button onClick={deleteTask} variant='contained' autoFocus>
            Delete
				</Button>
			</ModalWindow>
		</>
	);
};

export default Task;
