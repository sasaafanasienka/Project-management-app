import {
	FC, ReactElement, useState, useRef, SyntheticEvent,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import { Draggable } from 'react-beautiful-dnd';
import FlexBox from '../styled/FlexBox';
import { TaskPropsModel } from './interfaces';
import StyledTask from './StyledTask';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';
import { ItemTypes } from '../board/interfaces';
import TaskDetails from '../taskDetails/TaskDetails';
import ModalTitleNode from '../modal/modalTitleNode/ModalTitleNode';

const Task: FC<TaskPropsModel> = (props): ReactElement => {
	const {
		title, description, _id: id, columnId, userId, users,
	} = { ...props.task };

	const [isOpened, setOpened] = useState<ModalWindowStateModel>(false);
	const [isUpdateModalOpened, setIsUpdateModalOpened] = useState<boolean>(false);

	const openModal = (event: SyntheticEvent) => {
		event.stopPropagation();
		setOpened(true);
	};

	const openDetailedModal = () => {
		setIsUpdateModalOpened(true);
	};

	const closeModal = () => {
		setOpened(false);
	};

	const deleteTask = () => {
		closeModal();
	};

	return (
		<>
			<Draggable draggableId={title} index={props.index}>
				{(provided) => (
					<StyledTask
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						// innerRef={provided.innerRef}
						onClick={openDetailedModal}
					>
						<h3>{ title }</h3>
						<p>{description}</p>
						<FlexBox justifyContent='flex-end'>
							<IconButton aria-label="delete" size="small" onClick={openModal}>
								<DeleteIcon fontSize='small'/>
							</IconButton>
						</FlexBox>
					</StyledTask>
				)}
			</Draggable>
			<ModalWindow
				title={`Are you sure to delete the task "${title}"?`}
				description="This action cannot be undone"
				isOpened={isOpened}
				closeFunc={closeModal}
			>
				<Button onClick={closeModal}>Cancel</Button>
				<Button onClick={deleteTask} variant='outlined' autoFocus>
            Delete
				</Button>
			</ModalWindow>
			<ModalWindow
				title={<ModalTitleNode
					closeFn={() => setIsUpdateModalOpened(false)}
					firstRow={`Task ID: ${id}`}
					secondRow={`Owner: ${userId}`}
				/>}
				isOpened={isUpdateModalOpened}
				closeFunc={closeModal}
			>
				<TaskDetails
					title={title}
					description={description}
					users={users}
				>
					<FlexBox justifyContent='right'>
						<Button onClick={() => setIsUpdateModalOpened(false)} variant='outlined' autoFocus>
								Delete
						</Button>
						<Button color='info' onClick={deleteTask} variant='contained'>
								Update
						</Button>
					</FlexBox>
				</TaskDetails>
			</ModalWindow>
		</>
	);
};

export default Task;
