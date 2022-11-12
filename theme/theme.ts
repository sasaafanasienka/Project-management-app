import { createTheme } from '@mui/material/styles';
import RobotoRegular from './fonts/Roboto-Regular.ttf';
import RobotoBold from './fonts/Roboto-Bold.ttf';
import RobotoMedium from './fonts/Roboto-Medium.ttf';

const theme = createTheme({
	palette: {
		primary: {
			light: '#e26a5d',
			main: '#E15342',
			dark: '#d22613',
			contrastText: '#5A5A5A',
		},
		secondary: {
			light: '#707070',
			main: '#5a5a5a',
			dark: '#000000',
			contrastText: '#ffffff',
		},
	},
	typography: {
		fontFamily: [
			'Roboto',
			'sans-serif',
		].join(','),
	},
});

export default theme;
