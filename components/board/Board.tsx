import {
	FC, ReactElement, useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { deepCopy } from 'deep-copy-ts';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from '../column/Column';
import { ColumnPropsModel } from '../column/interfaces';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';
import mockData from './mockData';

const Board: FC = (): ReactElement => {
	const [columns, setColumns] = useState(mockData);

	const handleDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId
			&& destination.index === source.index) {
			return;
		}
		console.log(destination, source, draggableId);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<PageHeading text='Boards > Board name'></PageHeading>
			<FlexBox justifyContent='flex-start' alignItems='stretch' wrap='nowrap'>
				{columns.map((column) => <Column
					title={column.title} id={column.id} tasks={column.tasks} key={column.title} />)}
			</FlexBox>
		</DragDropContext>
	);
};

export default Board;
