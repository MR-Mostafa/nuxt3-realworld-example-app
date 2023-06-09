export interface User {
	user: {
		email: string;
		token: string;
		username: string;
		bio: string;
		image: string;
	};
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
