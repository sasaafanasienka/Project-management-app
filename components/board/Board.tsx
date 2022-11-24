import { FC, ReactElement, useState } from 'react';
import Column from '../column/Column';
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


	return (
		<>
			<PageHeading text='Boards > Board name'></PageHeading>
			<FlexBox justifyContent='flex-start' alignItems='stretch' wrap='nowrap'>
				{columns.map((column) => (
					<Column
						key={column.title}
						title={column.title}
						tasks={column.tasks}
					/>
				))}
			</FlexBox>
		</>
	);
};

export default Board;
