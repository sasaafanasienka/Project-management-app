import { FC, ReactElement } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Aside from '../aside/Aside';
import Main from '../main/Main';
import MainContent from '../main-content/MainСontent';
import { LayoutPropsModel } from './interfaces';

const Layout: FC<LayoutPropsModel> = (props): ReactElement => {
	const { children } = { ...props };

	return (
		<>
			<Header></Header>
			<MainContent>
				<Aside></Aside>
				<Main>
					{children}
				</Main>
			</MainContent>
			<Footer></Footer>
		</>

	);
};

export default Layout;
