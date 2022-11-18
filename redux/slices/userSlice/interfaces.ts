export interface InitialStateUserModel {
	isAuth: boolean;
  isLoading: boolean;
  isCreated: boolean;
  error: string;
	user: {
		_id: string;
		name: string;
		login: string;
		token: string;
	},
}

export interface NewUserResponseModel {
  _id: string;
  name: string;
  login: string;
}

export interface NewUserRequestPropsModel {
  name: string;
  login: string;
  password: string;
}
