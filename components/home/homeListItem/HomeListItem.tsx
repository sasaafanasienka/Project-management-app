import { FC, ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Tooltip } from '@mui/material';
import { HomeListItemProps } from '../interfaces';

const HomeListItem: FC<HomeListItemProps> = (props): ReactElement => {
	const {
		title, alt, link, image,
	} = { ...props };

	return (
		<Tooltip title={title} arrow placement='top' followCursor>
			<Link href={link}>
				<Image
					src={image}
					alt={alt}
					width='100'
					height='100'
				>
				</Image>
			</Link>
		</Tooltip>
	);
};

export default HomeListItem;
