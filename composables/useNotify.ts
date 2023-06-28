import { fasCheckSquare, fasExclamationTriangle } from '@quasar/extras/fontawesome-v5';
import { Notify } from 'quasar';
import { ONE_SECOND } from '~/constants';

interface useNotifyProps {
	message: string;
	type: 'error' | 'success';
}

const obj = {
	error: {
		color: 'red-8',
		icon: fasExclamationTriangle,
		type: 'negative',
	},
	success: {
		color: 'green-8',
		icon: fasCheckSquare,
		type: 'positive',
	},
};

export const useNotify = ({ message, type }: useNotifyProps) => {
	return Notify.create({
		timeout: ONE_SECOND * 6,
		progress: true,
		multiLine: true,
		badgeClass: 'hidden',
		position: 'bottom-left',
		html: true,
		color: obj[type].color,
		icon: obj[type].icon,
		type: obj[type].type,
		message,
	});
};
