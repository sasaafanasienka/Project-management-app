import { ReactNode } from 'react';

export interface ProfileLayoutProps {
  children: ReactNode;
}

export interface UserUpdateFormDataModel {
	name: string;
	login: string;
	password: string;
}
