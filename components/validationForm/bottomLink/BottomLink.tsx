import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { BottomLinkProps } from './interfaces';
import StyledBottomLink from './StyledBottomLink';

const BottomLink: FC<BottomLinkProps> = ({ text, linkTo }): ReactElement => (
	<StyledBottomLink>
		{text}
		<Link color={'red'} href={`/${linkTo.toLowerCase()}`}>{linkTo}</Link>
	</StyledBottomLink>
);

export default BottomLink;
