declare global {
	var process: NodeJS.Process;
	namespace NodeJS {
		interface ProcessEnv {
			readonly COOKIE_TOKEN_NAME: string;
			readonly BASE_URL: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
