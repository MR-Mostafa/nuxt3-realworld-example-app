export interface UserData {
	email: string;
	token: string;
	username: string;
	bio: string;
	image: string;
}

export interface User {
	user: UserData;
}

export interface UserLogin {
	email: string;
	password: string;
}

export interface RegisterLogin {
	username: string;
	email: string;
	password: string;
}
