import { FC, ReactElement, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import FlexBox from '../styled/FlexBox';
import StyledColumn from './StyledColumn';
import Task from '../task/Task';
import ModalWindow from '../modal/ModalWindow';
import { ColumnPropsModel } from './interfaces';
import { ModalWindowStateModel } from '../modal/interfaces';
import { TaskModel } from '../task/interfaces';

const tasksMck: TaskModel[] = [
	{
		_id: '1',
		title: 'Eat',
		order: 0,
		boardId: '1561',
		columnId: '16589',
		description: 'Pasta',
		userId: 2342343,
		users: ['15151', '1151', '16516'],
	},
	{
		_id: '2',
		title: 'Sleep',
		order: 0,
		boardId: '155461',
		columnId: '1655489',
		description: 'React-error-boundary - is a lightweight package ready to use for this scenario with TS support built-in. This approach also lets you avoid class components that are not that popular anymore.',
		userId: 234234345,
		users: ['15154541', '451151', '1456516'],
	},
	{
		_id: '3',
		title: 'Train',
		order: 0,
		boardId: '156541',
		columnId: '165849',
		description: 'However, many hooks are initialized with null-ish default values, and you may wonder how to provide types. Explicitly declare the type, and use a union type:',
		userId: 234236543,
		users: ['1465151', '184151', '16556616'],
	},
];


const Column: FC<ColumnPropsModel> = (props): ReactElement => {
	const { title } = { ...props };

	const [isModalOpened, setOpened] = useState<ModalWindowStateModel>(false);

	const openModal = () => {
		setOpened(true);
	};

	const closeModal = () => {
		setOpened(false);
	};

	const deleteColumn = () => {
		closeModal();
	};

	return (
		<>
			<StyledColumn>
				<FlexBox justifyContent='space-between'>
					<h3>{title}</h3>
					<IconButton aria-label="delete" size="small" onClick={openModal}>
						<DeleteIcon fontSize='small'/>
					</IconButton>
				</FlexBox>
				{tasksMck.map((item) => <Task key={item._id} task={item} />)}
			</StyledColumn>
			<ModalWindow
				title={`Are you sure to delete the column "${title}"?`}
				description="This action cannot be undone"
				isOpened={isModalOpened}
				closeFunc={closeModal}
			>
				<Button onClick={closeModal}>Cancel</Button>
				<Button onClick={deleteColumn} variant='contained' autoFocus>
            Delete
				</Button>
			</ModalWindow>
		</>

	);
};


export default Column;
