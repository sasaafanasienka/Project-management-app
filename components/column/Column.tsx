import { FC, ReactElement } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FlexBox from '../styled/FlexBox';
import StyledColumn from './StyledColumn';
import Task from '../task/Task';

const Column: FC = (): ReactElement => (
	<StyledColumn>
		<FlexBox justifyContent='space-between'>
			<h3>Column name</h3>
			<IconButton aria-label="delete" size="small">
				<DeleteIcon fontSize='small'/>
			</IconButton>
		</FlexBox>
		<Task
			title='First task'
			description='Description'
		/>
		<Task
			title='Second task'
			description='Description'
		/>
		<Task
			title='Second task'
			description='Description'
		/>
		<Task
			title='Second task'
			description='Description'
		/>
		<Task
			title='Second task'
			description='Description'
		/>
		<Task
			title='Second task'
			description='Description'
		/>
		<Task
			title='Second task'
			description='Description'
		/>
	</StyledColumn>
);

export default Column;
