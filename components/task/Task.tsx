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
import { ItemTypes } from '../board/interfaces';

const Task: FC<TaskPropsModel> = (props): ReactElement => {
	const {
		title, description, id, index, columnIndex, moveTask, columnId,
	} = { ...props };

	const [isOpened, setOpened] = useState<ModalWindowStateModel>(false);

	const taskRef = useRef<HTMLDivElement>(null);

	interface DragItem {
		index: number
		id: string
		columnId: string
		type: string
	}

	const [{}, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
		accept: ItemTypes.TASK,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
				isOver: monitor.isOver(),
			};
		},
		hover(item: DragItem, monitor) {
			if (!taskRef.current) {
				return;
			}
			const dragId = item.id;
			const hoverId = id;
			const dragColumnId = item.columnId;
			const hoverColumnId = columnId;

			if (dragId !== hoverId) {
				moveTask(dragId, hoverId, dragColumnId, hoverColumnId);
				if (dragColumnId !== hoverColumnId) {
					item.id = hoverId;
				}
				item.columnId = hoverColumnId;
			}
		},
	});

	const [{}, drag] = useDrag({
		type: ItemTypes.TASK,
		item: () => ({ id, index, columnId }),
	});

	drag(drop(taskRef));

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
				ref={taskRef}
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
