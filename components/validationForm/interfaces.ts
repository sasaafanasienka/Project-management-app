import { ReactNode } from 'react';
import { SubmitHandler } from 'react-hook-form';

export interface UserUpdateFormDataModel {
	name?: string;
	login: string;
	password: string;
}

export interface ValidationFormProps {
  header: string;
  submitBtnTxt: string;
  onSubmit: SubmitHandler<UserUpdateFormDataModel>;
  children?: ReactNode;
  resetForm?: boolean;
  isSigningIn?: boolean;
}

export interface ValidationFormWrapperProps {
  children: ReactNode;
}
