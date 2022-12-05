import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { BottomLinkProps } from './interfaces';
import StyledBottomLink from './StyledBottomLink';

const BottomLink: FC<BottomLinkProps> = ({ text, linkTo, linkText }): ReactElement => (
	<StyledBottomLink>
		{text}
		<Link href={`/${linkTo}`}>{linkText}</Link>
	</StyledBottomLink>
);

export default BottomLink;
