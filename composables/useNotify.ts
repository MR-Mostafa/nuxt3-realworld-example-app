import { Notify } from 'quasar';
import { ONE_SECOND } from '~/constants';

interface useNotifyProps {
	message: string;
	icon: string;
	color: 'red-8' | 'green-8';
	type: 'negative' | 'positive';
}

export const useNotify = ({ message, icon, color, type }: useNotifyProps) => {
	return Notify.create({
		timeout: ONE_SECOND * 6,
		progress: true,
		multiLine: true,
		badgeClass: 'hidden',
		position: 'bottom-left',
		html: true,
		message,
		icon,
		color,
		type,
	});
};
