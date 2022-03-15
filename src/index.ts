import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const bootstrap = async () => {
	const app = express();

	app.listen(4000, async () => {
		console.log('server is Up :)');
	});
};

bootstrap();
