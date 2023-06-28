export const capitalizeWord = (text: string) => {
	return text
		.split(' ')
		.map((word) => {
			const firstLetter = word.charAt(0);

			return `${firstLetter.toUpperCase()}${word.slice(1)}`;
		})
		.join(' ');
};
