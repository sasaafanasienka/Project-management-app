import { FC, ReactElement } from 'react';
import Column from '../column/Column';
import PageHeading from '../pageHeading/PageHeading';
import FlexBox from '../styled/FlexBox';

const Board: FC = (): ReactElement => (
	<>
		<PageHeading text='Boards > Board name'></PageHeading>
		<FlexBox justifyContent='flex-start' alignItems='stretch' wrap='nowrap'>
			<Column title="first column"></Column>
			<Column title="second column"></Column>
		</FlexBox>
	</>
);

export default Board;
