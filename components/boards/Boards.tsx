import { FC, ReactElement } from 'react';
import BoardLink from '../boardLink/BoardLink';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';

const temporaryBoardsMock = [
	{
		title: 'Create super app',
		description: 'Collaborate, manage projects, and reach new productivity peaks. Accomplish it all with RS Project Management App',
		id: 123,
	},
	{
		title: 'Create qwwer erw fgdfgdf app',
		description: 'Collaborate, manage projects, and reach',
		id: 1234,
	},
	{
		title: 'Go fuck yourself',
		description: 'Collaborate, manage ',
		id: 12345,
	},
];

const Boards: FC = (): ReactElement => (
	<>
		<PageHeading text="Boards"></PageHeading>
		<FlexBox justifyContent='flex-start' alignItems='stretch'>
			{temporaryBoardsMock.map((el) => (
				<BoardLink
					key={el.id}
					title={el.title}
					description={el.description}
				/>
			))}
		</FlexBox>
	</>
);

export default Boards;
