import type { Identifier, XYCoord } from 'dnd-core';
import {
	FC, ReactElement, useState, useRef,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import FlexBox from '../styled/FlexBox';
import StyledColumn from './StyledColumn';
import Task from '../task/Task';
import ModalWindow from '../modal/ModalWindow';
import { ColumnPropsModel } from './interfaces';
import { ModalWindowStateModel } from '../modal/interfaces';

const Column: FC<ColumnPropsModel> = (props): ReactElement => {
	const {
		title, index, id, tasks, moveColumn, moveTask,
	} = { ...props };

	const columnRef = useRef<HTMLDivElement>(null);

	interface DragItem {
		index: number
		id: string
		type: string
	}

	const ItemTypes = {
		COLUMN: 'column',
	};

	const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
		accept: ItemTypes.COLUMN,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor) {
			if (!columnRef.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = columnRef.current?.getBoundingClientRect();
			const {
				top, left, right, bottom,
			} = hoverBoundingRect;
			const initCursor = monitor.getInitialClientOffset();
			const diffCursor = monitor.getDifferenceFromInitialOffset();
			const cursor = {
				x: (initCursor ? initCursor.x : 0) + (diffCursor ? diffCursor.x : 0),
				y: (initCursor ? initCursor.y : 0) + (diffCursor ? diffCursor.y : 0),
			};
			if (
				cursor.x > left + 50
				&& cursor.x < right - 50
				&& cursor.y > top + 50
				&& cursor.y < bottom - 50
			) {
				console.log(true);
				item.index = hoverIndex;
				moveColumn(dragIndex, hoverIndex);
			}
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.COLUMN,
		item: () => ({ id, index }),
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;

	drag(drop(columnRef));

	const [isModalOpened, setOpened] = useState<ModalWindowStateModel>(false);

	const openModal = () => {
		setOpened(true);
	};

	const closeModal = () => {
		setOpened(false);
	};

	const deleteColumn = () => {
		closeModal();
	};

	return (
		<>
			<StyledColumn
				ref={columnRef}
				data-handler-id={handlerId}
				opacity={opacity}
			>
				<FlexBox justifyContent='space-between'>
					<h3>{title}</h3>
					<IconButton aria-label="delete" size="small" onClick={openModal}>
						<DeleteIcon fontSize='small'/>
					</IconButton>
				</FlexBox>
				{tasks.map((task, idx) => <Task
					key={idx}
					title={task.title}
					description={task.description}
					moveTask={moveTask}
					index={idx}
					columnId={+id}
					columnIndex={index}
				/>)}
			</StyledColumn>
			<ModalWindow
				title={`Are you sure to delete the column "${title}"?`}
				description="This action cannot be undone"
				isOpened={isModalOpened}
				closeFunc={closeModal}
			>
				<Button onClick={closeModal}>Cancel</Button>
				<Button onClick={deleteColumn} variant='contained' autoFocus>
            Delete
				</Button>
			</ModalWindow>
		</>
	);
};

export default Column;
