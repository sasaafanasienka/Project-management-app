import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton } from '@mui/material';
import { FC, ReactElement } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import StyledAside from './StyledAside';
import AsideButton from '../buttons/aside-button/AsideButton';


const Aside: FC = (): ReactElement => {
	const isDesktop = useMediaQuery('(min-width:1024px)');

	return (
		<StyledAside>
			{
				isDesktop && <>
					<AsideButton startIcon={<HomeOutlinedIcon />}>
						<Link href='/' >
							Home
						</Link>
					</AsideButton>
					<AsideButton startIcon={<ContentPasteOutlinedIcon />}>
						<Link href='/boards' >
							Boards
						</Link>
					</AsideButton>
					<AsideButton startIcon={<AccountCircleIcon />}>
						<Link href='/profile' >
							Profile
						</Link>
					</AsideButton>
					<AsideButton startIcon={<LoginIcon />}>
						<Link href='/signin' >
							Sign In
						</Link>
					</AsideButton>
					<AsideButton startIcon={<GroupAddIcon />}>
						<Link href='/signup' >
							Sign Un
						</Link>
					</AsideButton>
				</>
			}
			{
				!isDesktop && <>
					<IconButton
						color="secondary"
					>
						<Link href='/' >
							<HomeOutlinedIcon />
						</Link>
					</IconButton>
					<IconButton
						color="secondary"
					>
						<Link href='/boards' >
							<ContentPasteOutlinedIcon />
						</Link>
					</IconButton>
					<IconButton
						color="secondary"
					>
						<Link href='/profile' >
							<AccountCircleIcon />
						</Link>
					</IconButton>
					<IconButton
						color="secondary"
					>
						<Link href='/signin' >
							<LoginIcon />
						</Link>
					</IconButton>
					<IconButton
						color="secondary"
					>
						<Link href='/signup' >
							<GroupAddIcon />
						</Link>
					</IconButton>
				</>
			}
		</StyledAside>
	);
};

export default Aside;
