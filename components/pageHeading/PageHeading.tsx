import { FC } from 'react';
import Heading1 from '../styled/Heading1';
import { PageHeadingPropsModel } from './interfaces';

const PageHeading: FC<PageHeadingPropsModel> = (props) => {
	const { text } = { ...props };

	return (
		<Heading1>{ text }</Heading1>
	);
};

export default PageHeading;
