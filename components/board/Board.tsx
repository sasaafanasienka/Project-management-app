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

const Board: FC = (): ReactElement => {
	const [columns, setColumns] = useState([
		{
			title: 'first',
			index: 1,
			id: 1,
			tasks: [
				{
					title: 'First task',
					description: 'des',
					id: 10,
				},
				{
					title: 'Second task',
					description: 'des',
					id: 20,
				},
			],
		},
		{
			title: 'second',
			index: 2,
			id: 2,
			tasks: [
				{
					title: 'Third task',
					description: 'des',
					id: 30,
				},
			],
		},
		{
			title: 'third',
			index: 3,
			id: 3,
			tasks: [
				{
					title: 'Fourth task',
					description: 'des',
					id: 40,
				},
			],
		},
	]);

	const moveColumn = (dragIndex: number, hoverIndex: number): void => {
		const columnsCopy = deepCopy(columns);
		const removedColumn = columnsCopy.splice(dragIndex, 1)[0];
		columnsCopy.splice(hoverIndex, 0, removedColumn);
		setColumns(columnsCopy);
	};

	const moveTaskInColumn = (
		dragIndex: number,
		hoverIndex: number,
		dragColumnIndex: number,
	): void => {
		const columnsCopy = deepCopy(columns);
		const targetColumn = columnsCopy[dragColumnIndex];
		const tasksCopy = deepCopy(targetColumn.tasks);
		const removedTask = tasksCopy.splice(dragIndex, 1)[0];
		tasksCopy.splice(hoverIndex, 0, removedTask);
		columnsCopy.splice(dragColumnIndex, 1, { ...targetColumn, tasks: tasksCopy });
		setColumns(columnsCopy);
	};

	const moveTaskBetweenColumns = (
		dragIndex: number,
		dragColumnIndex: number,
		hoverIndex: number,
		hoverColumnIndex: number,
	): void => {
		const columnsCopy = deepCopy(columns);
		const dragColumn = columnsCopy[dragColumnIndex];
		const targetColumn = columnsCopy[hoverColumnIndex];
		const dragTasksCopy = deepCopy(dragColumn.tasks);
		const targetTasksCopy = deepCopy(targetColumn.tasks);
		const removedTask = dragTasksCopy.splice(dragIndex, 1)[0];
		targetTasksCopy.splice(hoverIndex, 0, removedTask);
		columnsCopy.splice(dragColumnIndex, 1, { ...dragColumn, tasks: dragTasksCopy });
		columnsCopy.splice(hoverColumnIndex, 1, { ...targetColumn, tasks: targetTasksCopy });
		console.log(columnsCopy);
		setColumns(columnsCopy);
	};

	const moveTask = (dragIndex, dragColumnIndex, hoverIndex, hoverColumnIndex): void => {
		if (dragColumnIndex === hoverColumnIndex) {
			moveTaskInColumn(dragIndex, hoverIndex, dragColumnIndex);
		} else {
			moveTaskBetweenColumns(dragIndex, dragColumnIndex, hoverIndex, hoverColumnIndex);
		}
	};

	const moveIntoEmptyColumn = (dragIndex, dragColumnIndex, hoverColumnIndex) => {
		if (!columns[hoverColumnIndex].tasks.length) {
			const columnsCopy = deepCopy(columns);
			const dragColumn = columnsCopy[dragColumnIndex];
			const targetColumn = columnsCopy[hoverColumnIndex];
			const dragTasksCopy = deepCopy(dragColumn.tasks);
			const removedTask = dragTasksCopy.splice(dragIndex, 1)[0];
			targetColumn.tasks.push(removedTask);
			columnsCopy.splice(dragColumnIndex, 1, { ...dragColumn, tasks: dragTasksCopy });
			columnsCopy.splice(hoverColumnIndex, 1, targetColumn);
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
