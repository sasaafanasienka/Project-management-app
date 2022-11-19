import { useMediaQuery, IconButton } from '@mui/material';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoginIcon from '@mui/icons-material/Login';
import StyledNav from './StyledNav';
import AsideButton from '../../buttons/aside-button/AsideButton';
import Divider from '../../divider/Divider';

const Nav: FC = (): ReactElement => {
	const isDesktop = useMediaQuery('(min-width:1024px)');

	return (
		<StyledNav>
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
					<Divider />
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
		</StyledNav>
	);
};

export default Nav;
