import {
	FC, ReactElement, useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deepCopy } from 'deep-copy-ts';
import Column from '../column/Column';
import { ColumnPropsModel } from '../column/interfaces';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';
import mockData from './mockData';

const Board: FC = (): ReactElement => {
	const [columns, setColumns] = useState(mockData);

	const moveColumn = (dragId: number, hoverId: number): void => {
		const dragIndex = columns.findIndex((el) => el.id === dragId);
		const hoverIndex = columns.findIndex((el) => el.id === hoverId);
		const columnsCopy = deepCopy(columns);
		const removedColumn = columnsCopy.splice(dragIndex, 1)[0];
		if (removedColumn) {
			columnsCopy.splice(hoverIndex, 0, removedColumn);
		}
		setColumns(columnsCopy);
	};

	const moveTaskInColumn = (
		dragId: string,
		hoverId: string,
		dragColumnId: string,
	): void => {
		const dragColumnIndex = columns.findIndex((column) => column.id === dragColumnId);
		const dragIndex = columns[dragColumnIndex].tasks.findIndex((task) => task._id === dragId);
		const hoverIndex = columns[dragColumnIndex].tasks.findIndex((task) => task._id === hoverId);
		const columnsCopy = deepCopy(columns);
		const targetColumn = columnsCopy[dragColumnIndex];
		const tasksCopy = deepCopy(targetColumn.tasks);
		const removedTask = tasksCopy.splice(dragIndex, 1)[0];
		if (removedTask) {
			tasksCopy.splice(hoverIndex, 0, removedTask);
			columnsCopy.splice(dragColumnIndex, 1, { ...targetColumn, tasks: tasksCopy });
		}
		setColumns(columnsCopy);
	};

	const moveTaskBetweenColumns = (
		dragId: string,
		hoverId: string,
		dragColumnId: string,
		hoverColumnId: string,
	): void => {
		const dragColumnIndex = columns.findIndex((column) => column.id === dragColumnId);
		const hoverColumnIndex = columns.findIndex((column) => column.id === hoverColumnId);
		const dragIndex = columns[dragColumnIndex].tasks.findIndex((task) => task._id === dragId);
		const hoverIndex = columns[dragColumnIndex].tasks.findIndex((task) => task._id === hoverId);
		const columnsCopy = deepCopy(columns);
		const dragColumn = columnsCopy[dragColumnIndex];
		const targetColumn = columnsCopy[hoverColumnIndex];
		const dragTasksCopy = deepCopy(dragColumn.tasks);
		const targetTasksCopy = deepCopy(targetColumn.tasks);
		const removedTask = dragTasksCopy.splice(dragIndex, 1)[0];
		if (removedTask) {
			targetTasksCopy.splice(hoverIndex, 0, removedTask);
			columnsCopy.splice(dragColumnIndex, 1, { ...dragColumn, tasks: dragTasksCopy });
			columnsCopy.splice(hoverColumnIndex, 1, { ...targetColumn, tasks: targetTasksCopy });
		}
		setColumns(columnsCopy);
	};

	const moveTask = (
		dragId: string,
		hoverId: string,
		dragColumnId: string,
		hoverColumnId: string,
	): void => {
		if (dragColumnId === hoverColumnId) {
			moveTaskInColumn(dragId, hoverId, dragColumnId);
		} else {
			moveTaskBetweenColumns(dragId, hoverId, dragColumnId, hoverColumnId);
		}
	};

	const moveIntoEmptyColumn = (dragId: string, dragColumnId: string, hoverColumnId: string) => {
		const dragColumnIndex = columns.findIndex((column) => column.id === dragColumnId);
		const hoverColumnIndex = columns.findIndex((column) => column.id === hoverColumnId);
		const dragIndex = columns[dragColumnIndex].tasks.findIndex((task) => task._id === dragId);
		if (!columns[hoverColumnIndex].tasks.length) {
			const columnsCopy = deepCopy(columns);
			const dragColumn = columnsCopy[dragColumnIndex];
			const targetColumn = columnsCopy[hoverColumnIndex];
			const dragTasksCopy = deepCopy(dragColumn.tasks);
			const removedTask = dragTasksCopy.splice(dragIndex, 1)[0];
			if (removedTask) {
				targetColumn.tasks.push(removedTask);
				columnsCopy.splice(dragColumnIndex, 1, { ...dragColumn, tasks: dragTasksCopy });
				columnsCopy.splice(hoverColumnIndex, 1, targetColumn);
			}
			setColumns(columnsCopy);
		}
	};

	const renderColumn = (column: ColumnPropsModel, index: number) => (
		<Column
			id={column.id}
			index={index}
			key={column.title}
			title={column.title}
			moveColumn={moveColumn}
			moveTask={moveTask}
			moveIntoEmptyColumn={moveIntoEmptyColumn}
			tasks={column.tasks}
		/>
	);

	return (
		<DndProvider backend={HTML5Backend}>
			<PageHeading text='Boards > Board name'></PageHeading>
			<FlexBox justifyContent='flex-start' alignItems='stretch' wrap='nowrap'>
				{columns.map((column, index) => renderColumn(column, index))}
			</FlexBox>
		</DndProvider>
	);
};

export default Board;
