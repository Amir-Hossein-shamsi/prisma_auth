import express, { Response, Request } from 'express';
import { prisma } from '../utils/prisma';
const routeer = express.Router();

//list all of Users if your role be admin
routeer.get('/users/list', async (req: Request, res: Response) => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			name: true,
		},
	});
	if (users.length === 0) {
		res.status(200).json({ status: '200', message: 'there is not any users' });
	}
	res.status(200).json({ status: '200', data: users });
});

//create new User
routeer.post('/users/create', async (req: Request, res: Response) => {
	const { email, password, name, role } = req.body;
	const user = await prisma.user.create({
		data: { email, password, name, role },
		select: { id: true, email: true },
	});
	res.json({
		status: 201,
		data: user,
		message: 'new user created successfully',
	});
});

export { routeer as userRouter };
