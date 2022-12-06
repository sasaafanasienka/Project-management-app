import { FC, ReactElement } from 'react';
import HomeTeam from './homeTeam/HomeTeam';
import HomeTechnologies from './homeTechnologies/HomeTechnologies';
import HomeTitle from './homeTitle/HomeTitle';
import HomeLayout from './layout/HomeLayout';
// import UserInfo from './userInfo/UserInfo';
// import UserUpdateForm from './userUpdateForm/UserUpdateForm';


const Home: FC = (): ReactElement => (
	<HomeLayout>
		<HomeTitle />
		<HomeTeam />
		<HomeTechnologies />
		{/* <UserInfo />
		<UserUpdateForm /> */}
	</HomeLayout>
);

export default Home;
