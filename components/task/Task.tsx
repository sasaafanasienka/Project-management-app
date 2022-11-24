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

	const taskRef = useRef<HTMLDivElement>(null);

	interface DragItem {
		index: number
		id: string
		columnIndex: number
		type: string
	}

	const ItemTypes = {
		TASK: 'task',
	};

	const [collectedProps, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
		accept: ItemTypes.TASK,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor) {
			if (!taskRef.current) {
				return;
			}

 			const dragIndex = item.index;
			const dragColumnIndex = item.columnIndex;
			const hoverIndex = index;
			const hoverColumnIndex = columnIndex;
			const hoverColumnId = columnId;

			if (dragIndex === hoverIndex) {

			}

			console.log(dragIndex, dragColumnIndex, '→', hoverIndex, hoverColumnIndex);


			// const hoverBoundingRect = taskRef.current?.getBoundingClientRect();
			// // console.log(hoverBoundingRect.bottom);
			// // console.log(hoverBoundingRect.top);

			// // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
			// // console.log(hoverMiddleX);

			// const clientOffset = monitor.getClientOffset();

			// // const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
			// const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

			// console.log(hoverClientX, hoverMiddleX);

			// if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
			// 	return;
			// }

			// if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
			// 	return;
			// }

			// moveTask(dragIndex, hoverIndex);

			// item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.TASK,
		item: () => ({ id, index }),
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;

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
				data-handler-id={collectedProps.handlerId}
				opacity={opacity}
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
