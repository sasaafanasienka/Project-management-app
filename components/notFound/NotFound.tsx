import Button from '@mui/material/Button';
import Link from 'next/link';
import FormWrapper from '../validationForm/formWrapper/FormWrapper';
import StyledNotFound from './StyledNotFound';

export default function NotFound() {
	return (
		<FormWrapper>
			<StyledNotFound>
				<div>
					<h1>
						<strong>404</strong>
						<p>PAGE WAS NOT FOUND</p>
					</h1>
				</div>
				<Link href='/'>
					<Button variant="contained">Go to Home page</Button>
				</Link>

			</StyledNotFound>
		</FormWrapper>
	);
}
