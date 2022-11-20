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
		{ title: 'first', index: 1, id: 1 },
		{ title: 'second', index: 2, id: 2 },
		{ title: 'third', index: 3, id: 3 },
		{ title: 'foutrh', index: 4, id: 4 },
	]);

	const moveColumn = (dragIndex: number, hoverIndex: number):void => {
		setColumns((prevColumns: ColumnPropsModel[]) => update(prevColumns, {
			$splice: [
				[dragIndex, 1],
				[hoverIndex, 0, prevColumns[dragIndex] as ColumnPropsModel],
			],
		}));
	};

	const renderColumn = (column: ColumnPropsModel, index: number) => (
		<Column
			index={index}
			key={column.title}
			title={column.title}
			moveColumn={moveColumn}
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
