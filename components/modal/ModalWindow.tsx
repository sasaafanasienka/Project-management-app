import {
	FC, ReactElement, useEffect,
} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ModalWindowPropsModel } from './interfaces';
import { useAppDispatch } from '../../redux/store';
import { closeModals } from '../../redux/slices/modalsSlice';

const ModalWindow: FC<ModalWindowPropsModel> = (props): ReactElement => {
	const dispatch = useAppDispatch();

	const {
		title, description, children, isOpened,
	} = { ...props };

	const close = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			dispatch(closeModals());
		}
		window.removeEventListener('keyup', close);
	};

	useEffect(() => {
		if (isOpened) {
			window.addEventListener('keyup', close);
		}
	});

	return (
		<Dialog
			open={isOpened}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{title}
			</DialogTitle>
			{description && <DialogContent>
				<DialogContentText id="alert-dialog-description">
					{description}
				</DialogContentText>
			</DialogContent>
			}
			<DialogActions>
				{children}
			</DialogActions>
		</Dialog>
	);
};

export default ModalWindow;
