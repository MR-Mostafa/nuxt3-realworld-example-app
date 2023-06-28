export interface ProfileDate {
	username: string;
	bio: string;
	image: string;
	following: boolean;
}

export interface Profile {
	profile: ProfileDate;
}

export interface UpdateUserData {
	email: string;
	username: string;
	password?: string;
	bio?: string;
	image?: string;
}
