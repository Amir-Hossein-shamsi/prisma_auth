import express, { Request, Response } from 'express';
import 'express-async-errors';
import './utils/prisma';
import { errorhandler } from 'commonefunchanddlers';
import { userRouter } from './routers/user.routes';

const bootstrap = async () => {
	const app = express();
	app.use(express.json());
	app.use('/api/', userRouter);
	app.use(errorhandler);
	app.listen(4000, async () => {
		console.log('server is Up http://localhost:4000  :)');
	});
};

bootstrap();
