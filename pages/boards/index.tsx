import Head from 'next/head';
import { FC, ReactElement } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Aside from '../../components/aside/Aside';
import Main from '../../components/main/Main';
import MainContent from '../../components/main-content/MainСontent';

const Boards: FC = (): ReactElement => (
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

export default Boards;
