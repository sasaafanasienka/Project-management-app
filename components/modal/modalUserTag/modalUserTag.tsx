/* eslint-disable no-unused-vars */
import { FC, ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import StyledModalUserTag from './SryledModalUserTag';

export interface ModalUserTagProps {
  name: string;
  deleteUser: (arg0: string) => void;
}

const ModalUserTag: FC<ModalUserTagProps> = ({ name, deleteUser }): ReactElement => {
	const handleDelete = () => {
		deleteUser(name);
	};
	return (
		<StyledModalUserTag>
			{name}
			<span onClick={handleDelete}>
				<CloseIcon />
			</span>
		</StyledModalUserTag>
	);
};

export default ModalUserTag;
