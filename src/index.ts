require('dotenv').config({ path: 'variable.env' });
import express from 'express';
import 'express-async-errors';
import './utils/prisma';
import { errorhandler } from 'commonefunchanddlers';
import { userRouter } from './routers/user.routes';
import log from './utils/logger';
import deserializeUser from './middlewares/deserialze';

const bootstrap = async () => {
	const app = express();
	app.use(express.json());
	app.use(deserializeUser);
	app.use('/api/', userRouter);
	app.use(errorhandler);
	app.listen(4000, async () => {
		log.info('server is Up http://localhost:4000  :)');
	});
};

bootstrap();
