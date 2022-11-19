import { FC, ReactElement } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import FlexBox from '../styled/FlexBox';
import { BoardLinkPropsModel } from './interfaces';
import StyledBoardLink from './StyledBoardLink';


const BoardLink: FC<BoardLinkPropsModel> = (props): ReactElement => {
	const { title, description } = { ...props };

	return (
		<Link href="/boards/111">
			<StyledBoardLink>
				<h3>{ title }</h3>
				<p>{description}</p>
				<FlexBox justifyContent='flex-end'>
					<IconButton aria-label="delete" size="small">
						<DeleteIcon fontSize='small'/>
					</IconButton>
				</FlexBox>
			</StyledBoardLink>
		</Link>
	);
};

export default BoardLink;
