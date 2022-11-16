import { Button } from '@mui/material';
import { FC, ReactElement } from 'react';
import { StyledHomeSection } from '../layout/StyledHomeLayout';

const HomeTitle: FC = (): ReactElement => (
	<StyledHomeSection>
		<h1>
      Kanban board for teams to organize their work
		</h1>
		<p>
      Collaborate, manage projects, and reach new productivity peaks.
      Accomplish it all with RS Project Management App.
		</p>
		<Button color="primary" size="large" variant="contained">Get started</Button>
	</StyledHomeSection>
);

export default HomeTitle;
