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
import { ItemTypes } from '../board/interfaces';

const Column: FC<ColumnPropsModel> = (props): ReactElement => {
	const {
		title, index, id, tasks, moveColumn, moveTask, moveIntoEmptyColumn,
	} = { ...props };

	const columnRef = useRef<HTMLDivElement>(null);

	interface DragItem {
		index: number
		id: string
		type: string
	}

	const [collected, drag] = useDrag({
		type: ItemTypes.COLUMN,
		item: () => ({ id, index }),
	});

	const [{ handlerId }, drop] = useDrop<DragItem, void, >({
		accept: [ItemTypes.COLUMN, ItemTypes.TASK],
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor) {
			if (monitor.getItemType() === ItemTypes.COLUMN) {
				if (!columnRef.current) {
					return;
				}
				const dragIndex = item.index;
				const hoverIndex = index;
				if (dragIndex === hoverIndex) {
					return;
				}

				moveColumn(dragIndex, hoverIndex);
				item.index = hoverIndex;
			}
			if (monitor.getItemType() === ItemTypes.TASK) {
				const dragIndex = item.index;
				const dragColumnIndex = item.columnIndex;
				const hoverColumnIndex = index;

				if (dragColumnIndex === hoverColumnIndex) {
					return;
				}
				moveIntoEmptyColumn(dragIndex, dragColumnIndex, hoverColumnIndex);
			}
		},
	});

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
					id={task.id}
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
