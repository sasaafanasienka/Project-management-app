import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Aside from '../../components/aside/aside';
import Main from '../../components/main/main';
import MainContent from '../../components/main-content/main-content';

const Board: FC = (): ReactElement => (
	<>
		<Head>
			<title>Home page</title>
			<meta name="description" content="Generated by create next app" />
			<link rel="icon" href="/favicon.ico" />
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
