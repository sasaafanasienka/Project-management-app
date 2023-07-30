import Link from 'next/link';
import Image from 'next/image';
import { FC, ReactElement } from 'react';
import StyledLogo from './StyledLogo';
import { useAppSelector } from '../../redux/store';

const Logo: FC = (): ReactElement => {
	const { logoText } = useAppSelector((state) => state.lang.text);

	return (
		<StyledLogo>
			<Link href='/'>
				<Image src='/logo8.svg' height={40} width={40} alt='Project mangement app' />
				<div>
					{logoText}
				</div>
			</Link>
		</StyledLogo>
	);
};


export default Logo;
