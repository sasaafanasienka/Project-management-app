import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Aside from '../../components/aside/Aside';
import Main from '../../components/main/Main';
import MainContent from '../../components/main-content/MainСontent';

const Board: FC = (): ReactElement => (
	<>
		<Head>
			<title>Home page</title>
		</Head>
		<Header></Header>
		<MainContent>
			<Aside></Aside>
			<Main></Main>
		</MainContent>
		<Footer></Footer>
	</>
);

export default Board;
