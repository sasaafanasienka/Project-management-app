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

	const [currentColumn, setCurrenColumn] = useState(null);

	const onDragOver = (e, column) => {
		e.preventDefault();
		const state1 = columns;
		const deleted = state1.splice(currentColumn, 1);
		const empty = {
			empty: true,
		};
		const targetIndex = state1.indexOf(column);
		state1.splice(targetIndex, 0, empty);
		setColumns(state1);
	};
	const onDragLeave = (e) => {
		// console.log(e);
	};
	const onDragStart = (e) => {
		const { currentTarget } = e;
		currentTarget.style.opacity = 0;
		const targetIndex = +currentTarget.getAttribute('data-column-index');
		setCurrenColumn(targetIndex);
	};
	const onDragEnd = (e) => {
		const { currentTarget } = e;
		currentTarget.style.opacity = 1;
	};
	const onDrop = (e, column) => {
		e.preventDefault();
		const state1 = columns;
		const deleted = state1.splice(currentColumn, 1);
		const targetIndex = state1.indexOf(column);
		state1.splice(targetIndex, 0, deleted[0]);
		console.log(state1.map((el) => el.title));
		setColumns(state1);
	};

	const renderColumn = (column: ColumnPropsModel, index: number) => {
		if (column.empty) {
			return <div></div>;
		}
		return (
			<Column
				id={column.id}
				index={index}
				key={column.title}
				title={column.title}
				tasks={column.tasks}
				onDragOver={(event) => { onDragOver(event, column); }}
				onDragLeave={onDragLeave}
				onDragStart={(event) => { onDragStart(event, column, index); }}
				onDragEnd={onDragEnd}
				onDrop={(event) => { onDrop(event, column); }}
			/>
		);
	};

	return (
		<>
			<PageHeading text='Boards > Board name'></PageHeading>
			<FlexBox justifyContent='flex-start' alignItems='stretch' wrap='nowrap'>
				{columns.map((column, index) => renderColumn(column, index))}
			</FlexBox>
		</>
	);
};

export default Board;
