import { ErrorValidation } from '~/types';

interface ValidationProps {
	validate: { condition: boolean; message: string }[];
	ref: ErrorValidation;
}

export const validator = ({ ref, validate }: ValidationProps) => {
	const itemError = validate.find((item) => item.condition);

	if (itemError) {
		ref.hasError = true;
		ref.message = itemError.message;
	} else {
		if (ref.hasError) ref.hasError = false;
		if (ref.message) ref.message = undefined;
	}

	return !!itemError;
};
