import {
	FC, ReactElement, useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
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

	const moveColumn = (dragIndex: number, hoverIndex: number):void => {
		setColumns((prevColumns: ColumnPropsModel[]) => update(prevColumns, {
			$splice: [
				[dragIndex, 1],
				[hoverIndex, 0, prevColumns[dragIndex] as ColumnPropsModel],
			],
		}));
	};

	const moveTask = () => {

	};

	const renderColumn = (column: ColumnPropsModel, index: number) => (
		<Column
			id={column.id}
			index={index}
			key={column.title}
			title={column.title}
			moveColumn={moveColumn}
			moveTask={moveTask}
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
