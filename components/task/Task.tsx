import {
	FC, ReactElement, SyntheticEvent, useState,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FlexBox from '../styled/FlexBox';
import { TaskPropsModel } from './interfaces';
import StyledTask from './StyledTask';
import ModalWindow from '../modal/ModalWindow';
import { ModalWindowStateModel } from '../modal/interfaces';
import TaskDetails from '../taskDetails/TaskDetails';
import ModalTitleNode from '../modal/modalTitleNode/ModalTitleNode';


const Task: FC<TaskPropsModel> = ({ task }): ReactElement => {
	const { title, description } = task;

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
			<StyledTask onClick={openDetailedModal}>
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
				<Button onClick={deleteTask} variant='outlined' autoFocus>
            Delete
				</Button>
			</ModalWindow>
			<ModalWindow
				title={<ModalTitleNode
					closeFn={() => setIsUpdateModalOpened(false)}
					firstRow={`Task ID: ${task._id}`}
					secondRow={`Owner: ${task.userId}`}
				/>}
				isOpened={isUpdateModalOpened}
				closeFunc={closeModal}
			>
				<TaskDetails task={task}>
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
