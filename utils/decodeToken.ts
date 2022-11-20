import jwt_decode from 'jwt-decode';

const decodeToken = (token: string) => (
	jwt_decode<{login: string; id: string; exp: number}>(token)
);

export default decodeToken;
