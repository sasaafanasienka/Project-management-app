import { FC, ReactElement } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FlexBox from '../styled/FlexBox';
import { TaskPropsModel } from './interfaces';
import StyledTask from './StyledTask';


const Task: FC<TaskPropsModel> = (props): ReactElement => {
	const { title, description } = { ...props };

	return (
		<StyledTask>
			<h3>{ title }</h3>
			<p>{description}</p>
			<FlexBox justifyContent='flex-end'>
				<IconButton aria-label="delete" size="small">
					<DeleteIcon fontSize='small'/>
				</IconButton>
			</FlexBox>
		</StyledTask>
	);
};

export default Task;
