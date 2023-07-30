import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			light: '#e26a5d',
			main: '#E15342',
			dark: '#d22613',
			contrastText: '#ffffff',
		},
		secondary: {
			light: '#CDCDCD',
			main: '#5a5a5a',
			dark: '#000000',
			contrastText: '#ffffff',
		},
	},
});

export default theme;
