import Button from '@mui/material/Button';
import Link from 'next/link';
import { useAppSelector } from '../../redux/store';
import FormWrapper from '../validationForm/formWrapper/FormWrapper';
import StyledNotFound from './StyledNotFound';

export default function NotFound() {
	const pageNotFoundText = useAppSelector((state) => state.lang.text.notFound);
	const btnText = useAppSelector((state) => state.lang.text.navHome);
	return (
		<FormWrapper>
			<StyledNotFound>
				<div>
					<h1>
						<strong>404</strong>
						<p>{pageNotFoundText}</p>
					</h1>
				</div>
				<Link href='/'>
					<Button variant="contained">{btnText}</Button>
				</Link>

			</StyledNotFound>
		</FormWrapper>
	);
}
