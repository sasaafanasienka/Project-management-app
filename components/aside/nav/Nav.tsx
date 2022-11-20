import { useMediaQuery, IconButton } from '@mui/material';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoginIcon from '@mui/icons-material/Login';
import StyledNav from './StyledNav';
import AsideButton from '../../buttons/aside-button/AsideButton';
import Divider from '../../divider/Divider';
import { useAppSelector } from '../../../redux/store';

const Nav: FC = (): ReactElement => {
	const isDesktop = useMediaQuery('(min-width:1024px)');
	const homeLang = useAppSelector((state) => state.lang.text.navHome);
	const profileLang = useAppSelector((state) => state.lang.text.navProfile);
	const boardsLang = useAppSelector((state) => state.lang.text.navBoards);
	const signInLang = useAppSelector((state) => state.lang.text.singIn);
	const signUpLang = useAppSelector((state) => state.lang.text.singUp);
	const signOutLang = useAppSelector((state) => state.lang.text.singOut);
	const isAuth = useAppSelector((state) => state.user.isAuth);


	return (
		<StyledNav>
			{
				isDesktop && <>
					<AsideButton startIcon={<HomeOutlinedIcon />}>
						<Link href='/' >
							{homeLang}
						</Link>
					</AsideButton>
					<AsideButton startIcon={<ContentPasteOutlinedIcon />}>
						<Link href='/boards' >
							{boardsLang}
						</Link>
					</AsideButton>
					<AsideButton startIcon={<AccountCircleIcon />}>
						<Link href='/profile' >
							{profileLang}
						</Link>
					</AsideButton>
					<Divider />
					{!isAuth
						? <>
							<AsideButton startIcon={<LoginIcon />}>
								<Link href='/signin' >
									{signInLang}
								</Link>
							</AsideButton>
							<AsideButton startIcon={<GroupAddIcon />}>
								<Link href='/signup' >
									{signUpLang}
								</Link>
							</AsideButton>

						</>
						: <AsideButton startIcon={<LogoutOutlinedIcon />}>
							<Link href='/' >
								{signOutLang}
							</Link>
						</AsideButton>
					}
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
					{!isAuth
						? <>
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
						: <IconButton
							color="secondary"
						>
							<Link href='/' >
								<LogoutOutlinedIcon />
							</Link>
						</IconButton>
					}
				</>
			}
		</StyledNav>
	);
};

export default Nav;
