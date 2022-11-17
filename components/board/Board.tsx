import { FC, ReactElement } from 'react';
import Column from '../column/Column';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';

const Board: FC = (): ReactElement => (
	<>
		<PageHeading text='Boards > Board name'></PageHeading>
		<FlexBox justifyContent='flex-start' alignItems='stretch' wrap='nowrap'>
			<Column></Column>
			<Column></Column>
			<Column></Column>
			<Column></Column>
			<Column></Column>
			<Column></Column>
			<Column></Column>
			<Column></Column>
			<Column></Column>
			{/* {temporaryBoardsMock.map((el) => (
				<BoardLink
					key={el.id}
					title={el.title}
					description={el.description}
				/>
			))} */}
		</FlexBox>
	</>
);

export default Board;
