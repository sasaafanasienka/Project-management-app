import { FC, ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';
import Aside from '../aside/aside';
import Footer from '../footer/footer';
import Header from '../header/header';
import Main from '../main/main';
import MainContent from '../mainСontent/MainСontent';
import { LayoutPropsModel } from './interfaces';
import 'react-toastify/dist/ReactToastify.css';

const Layout: FC<LayoutPropsModel> = (props): ReactElement => {
	const { children } = { ...props };

	return (
		<>
			<Header></Header>
			<MainContent>
				<Aside></Aside>
				<Main>
					{children}
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
