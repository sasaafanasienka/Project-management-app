import { FC, ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import Aside from '../aside/aside';
import Footer from '../footer/footer';
import Header from '../header/header';
import Main from '../main/main';
import MainContent from '../mainСontent/MainСontent';
import { LayoutPropsModel } from './interfaces';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../loader/Loader';
import { useAppSelector } from '../../redux/store';

const Layout: FC<LayoutPropsModel> = (props): ReactElement => {
	const { children } = { ...props };
	const isBoardsLoading = useAppSelector((state) => state.boards.isLoading);
	const isColumnsLoading = useAppSelector((state) => state.columns.isLoading);
	const isTasksLoading = useAppSelector((state) => state.tasks.isLoading);
	const isUserLoading = useAppSelector((state) => state.user.isLoading);

	return (
		<>
			<Header></Header>
			<MainContent>
				<Aside></Aside>
				<Main>
					{ (isBoardsLoading || isColumnsLoading || isTasksLoading || isUserLoading)
						&& <Loader />
					}
					{ children }

					<ToastContainer
						position="bottom-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="colored"
					/>
				</Main>
			</MainContent>
			<Footer></Footer>
		</>

	);
};

export default Layout;
