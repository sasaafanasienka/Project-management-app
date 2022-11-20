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
		title, index, moveColumn, id,
	} = { ...props };

	const columnRef = useRef<HTMLDivElement>(null);

	interface DragItem {
		index: number
		id: string
		type: string
	}

	const ItemTypes = {
		CARD: 'card',
	};

	const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
		accept: ItemTypes.CARD,
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
			// console.log(hoverBoundingRect.bottom);
			// console.log(hoverBoundingRect.top);

			// const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
			// console.log(hoverMiddleX);

			const clientOffset = monitor.getClientOffset();

			// const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
			const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

			console.log(hoverClientX, hoverMiddleX);

			if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
				return;
			}

			moveColumn(dragIndex, hoverIndex);

			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
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
			<StyledColumn ref={columnRef} data-handler-id={handlerId} opacity={opacity}>
				<FlexBox justifyContent='space-between'>
					<h3>{title}</h3>
					<IconButton aria-label="delete" size="small" onClick={openModal}>
						<DeleteIcon fontSize='small'/>
					</IconButton>
				</FlexBox>
				<Task
					title='First task'
					description='Description'
				/>
				<Task
					title='Second task'
					description='Description'
				/>
				<Task
					title='Second task'
					description='Description'
				/>
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
