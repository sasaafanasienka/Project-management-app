import { useMediaQuery, IconButton } from '@mui/material';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/router';
import StyledNav from './StyledNav';
import AsideButton from '../../buttons/aside-button/AsideButton';
import Divider from '../../divider/Divider';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { logOut } from '../../../redux/slices/userSlice';

const Nav: FC = (): ReactElement => {
	const isDesktop = useMediaQuery('(min-width:1024px)');
	const homeLang = useAppSelector((state) => state.lang.text.navHome);
	const profileLang = useAppSelector((state) => state.lang.text.navProfile);
	const boardsLang = useAppSelector((state) => state.lang.text.navBoards);
	const signInLang = useAppSelector((state) => state.lang.text.singIn);
	const signUpLang = useAppSelector((state) => state.lang.text.singUp);
	const signOutLang = useAppSelector((state) => state.lang.text.singOut);
	const isAuth = useAppSelector((state) => state.user.isAuth);

	const router = useRouter();

	const dispatch = useAppDispatch();

	const handleLogOut = () => {
		dispatch(logOut());
		router.push('/', undefined, { shallow: true });
	};

	return (
		<StyledNav>
			{
				isDesktop && <>
					{isAuth && <>
						<Link href='/' >
							<AsideButton startIcon={<HomeOutlinedIcon />}>
								{homeLang}
							</AsideButton>
						</Link>
						<Link href='/boards' >
							<AsideButton startIcon={<ContentPasteOutlinedIcon />}>
								{boardsLang}
							</AsideButton>
						</Link>
						<Link href='/profile' >
							<AsideButton startIcon={<AccountCircleIcon />}>
								{profileLang}
							</AsideButton>
						</Link>
						<Divider />
					</>}
					{!isAuth
						? <>
							<Link href='/signin' >
								<AsideButton startIcon={<LoginIcon />}>
									{signInLang}
								</AsideButton>
							</Link>
							<Link href='/signup' >
								<AsideButton startIcon={<GroupAddIcon />}>
									{signUpLang}
								</AsideButton>
							</Link>
						</>
						: <AsideButton
							onClick={handleLogOut}
							startIcon={<LogoutOutlinedIcon />}>
							{signOutLang}
						</AsideButton>
					}
				</>
			}
			{
				!isDesktop && <>
					{isAuth && <>

						<Link href='/' >
							<IconButton
								color="secondary"
							>
								<HomeOutlinedIcon />
							</IconButton>
						</Link>
						<Link href='/boards' >
							<IconButton
								color="secondary"
							>
								<ContentPasteOutlinedIcon />
							</IconButton>
						</Link>
						<Link href='/profile' >
							<IconButton
								color="secondary"
							>
								<AccountCircleIcon />
							</IconButton>
						</Link>
					</>}
					{!isAuth
						? <>
							<Link href='/signin' >
								<IconButton
									color="secondary"
								>
									<LoginIcon />
								</IconButton>
							</Link>
							<Link href='/signup' >
								<IconButton
									color="secondary"
								>
									<GroupAddIcon />
								</IconButton>
							</Link>
						</>
						: <Link href='/' >
							<IconButton
								color="secondary"
							>
								<LogoutOutlinedIcon />
							</IconButton>
						</Link>
					}
				</>
			}
		</StyledNav>
	);
};

export default Nav;
