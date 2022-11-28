import {
	FC, ReactElement, useState, useRef, ChangeEvent,
} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FlexBox from '../styled/FlexBox';
import StyledColumn from './StyledColumn';
import Task from '../task/Task';
import ModalWindow from '../modal/ModalWindow';
import { ColumnPropsModel } from './interfaces';
import { ModalWindowStateModel } from '../modal/interfaces';
import { ItemTypes } from '../board/interfaces';
import { TaskModel } from '../task/interfaces';
import StyledTaskList from './StyledTaskList';
import StyledColumnTitle from './StyledColumnTitle';
import UpdateTitleInput from './updateTitleInput/UpdateTitleInput';

const Column: FC<ColumnPropsModel> = (props): ReactElement => {
	const {
		title, index, id, tasks, moveColumn, moveTask, moveIntoEmptyColumn,
	} = { ...props };

	const columnRef = useRef<HTMLDivElement>(null);

	interface DragItem {
		index: number
		id: string
		type: string
		columnId: string
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
				const dragId = item.id;
				const hoverId = id;
				if (dragId === hoverId) {
					return;
				}

				moveColumn(dragId, hoverId);
				item.id = hoverId;
			}
			if (monitor.getItemType() === ItemTypes.TASK) {
				const dragId = item.id;
				const dragColumnId = item.columnId;
				const hoverColumnId = id;

				if (dragColumnId !== hoverColumnId) {
					moveIntoEmptyColumn(dragId, dragColumnId, hoverColumnId);
				}
			}
		},
	});

	drag(drop(columnRef));

	const [isModalOpened, setOpened] = useState<ModalWindowStateModel>(false);
	const [isTitleUpdate, setIsTitleUpdate] = useState<boolean>(false);
	const [titleCurrent, setTitleCurrent] = useState<string>(title);

	const handleTitleUpdateConfirm = () => {
		setIsTitleUpdate(false);
	};

	const handleTitleUpdateCancel = () => {
		setIsTitleUpdate(false);
	};

	const handleTitleUpdateChange = (e: ChangeEvent) => {
		const target = e.target as HTMLTextAreaElement;
		setTitleCurrent(target.value);
	};

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
				<FlexBox justifyContent='space-between' wrap='no-wrap'>
					{isTitleUpdate
						? <UpdateTitleInput
							value={titleCurrent}
							onChange={handleTitleUpdateChange}
							onConfirm={handleTitleUpdateConfirm}
							onCancel={handleTitleUpdateCancel}
						/>
						: <StyledColumnTitle onClick={() => setIsTitleUpdate(true)}>
							<EditIcon color='secondary' />
							<h3>
								{title.toUpperCase()}
								{/* <span>{tasks.length}</span> */}
							</h3>
						</StyledColumnTitle>
					}
					<IconButton aria-label="delete" size="small" onClick={openModal}>
						<DeleteIcon fontSize='small'/>
					</IconButton>
				</FlexBox>

				<Button color='info'>
					<FlexBox alignItems='center' justifyContent='center' gap='0'>
						<AddIcon fontSize='small' />
						Add new task
					</FlexBox>
				</Button>
				<StyledTaskList>
					{/* {tasks.map((task, idx) => <Task
						key={idx}
						title={task.title}
						description={task.description}
						moveTask={moveTask}
						index={idx}
						columnId={id}
						columnIndex={index}
						id={task._id}
						userId={task.userId}
						users={task.users}
					/>)} */}
				</StyledTaskList>
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
