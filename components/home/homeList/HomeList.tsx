import { FC, ReactElement } from 'react';
import FlexBox from '../../styled/FlexBox';
import { HomeListProps } from '../interfaces';
import { StyledHomeSection } from '../layout/StyledHomeLayout';

const HomeList: FC<HomeListProps> = (props): ReactElement => {
	const { title, children } = { ...props };

	return (
		<StyledHomeSection>
			<h2>
				{title}
			</h2>
			<FlexBox>
				{children}
			</FlexBox>
		</StyledHomeSection>
	);
};

export default HomeList;
