import { FC, ReactElement } from 'react';
import { MainPropsModel } from './interfaces';
import StyledMain from './StyledMain';

const Main: FC<MainPropsModel> = (props): ReactElement => {
	const { children } = { ...props };

	return (
		<StyledMain>{children}</StyledMain>
	);
};

export default Main;
