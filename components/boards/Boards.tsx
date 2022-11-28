/* eslint-disable no-underscore-dangle */
import { FC, ReactElement } from 'react';
import AddBoard from '../addBoard/AddBoard';
import BoardLink from '../boardLink/BoardLink';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';

const temporaryBoardsMock = [
	{
		_id: '1',
		title: 'Укусить за бочок',
		owner: 'Серый Волк',
		users: ['козлик', 'asdas', 'asd'],
	},
	{
		_id: '2',
		title: 'Learn Next js',
		owner: 'Dan Abramov',
		users: ['saa', 'asdas', 'asd'],
	},
	{
		_id: '3',
		title: 'Learn SWR',
		owner: 'Dan Abramov',
		users: ['saa', 'asdas', 'asd'],
	},
];

const Boards: FC = (): ReactElement => (
	<>
		<PageHeading text="Boards"></PageHeading>
		<FlexBox justifyContent='flex-start' alignItems='stretch'>
			{temporaryBoardsMock.map((el) => (
				<BoardLink
					board={el}
					key={el._id}
				/>
			))}
			<AddBoard />
		</FlexBox>
	</>
);

export default Boards;
