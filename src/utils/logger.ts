import logger from 'pino';
import dayjs from 'dayjs';
import config from 'config';

const log = logger({
	transport: {
		target: 'pino-pretty',
	},

	base: {
		pid: false,
	},
	timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
});

export default log;
