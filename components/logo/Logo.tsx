import Link from 'next/link';
import Image from 'next/image';
import { FC, ReactElement } from 'react';
import StyledLogo from './StyledLogo';

const Logo: FC = (): ReactElement => (
	<StyledLogo>
		<Link href='/'>
			<Image src='/logo8.svg' height={40} width={40} alt='Project mangement app' />
			<div>
        Project management app
			</div>
		</Link>

	</StyledLogo>
);

export default Logo;
