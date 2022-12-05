import { Button, Link } from '@mui/material';
import React, { Component, ErrorInfo } from 'react';
import { useAppSelector } from '../../redux/store';
import { ErrorBoundaryPropsModel, ErrorBoundaryStateModel } from './interfaces';
import StyledErrorBoundary from './StyledErrorBoundary';

class ErrorBoundary extends Component<ErrorBoundaryPropsModel, ErrorBoundaryStateModel> {
	constructor(props: ErrorBoundaryPropsModel) {
		super(props);
		this.state = {
			hasError: false,
		};
	}

	title = useAppSelector((state) => state.lang.text.errorBoundary);

	btn = useAppSelector((state) => state.lang.text.navHome);

	public static getDerivedStateFromError(): ErrorBoundaryStateModel {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	// eslint-disable-next-line class-methods-use-this
	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<StyledErrorBoundary>
					<h1>{this.title}</h1>
					<Link href='/'>
						<Button variant="contained">{this.btn}</Button>
					</Link>
				</StyledErrorBoundary>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
