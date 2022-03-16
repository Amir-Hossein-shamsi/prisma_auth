import { nonauthorization } from 'commonefunchanddlers';
import express, { Response, Request } from 'express';
import { PasswordService } from '../utils/Password';
import { prisma } from '../utils/prisma';
const router = express.Router();

type bodyloginInput = {
	email: string;
	password: string;
};

//list all of Users if your role be admin
router.get('/users/list', async (req: Request, res: Response) => {
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

// router.get('/profile', async (req: Request, res: Response) => {
// 	const users = await prisma.user.findMany({
// 		select: {
// 			id: true,
// 			email: true,
// 			name: true,
// 		},
// 	});
// 	if (users.length === 0) {
// 		res.status(200).json({ status: '200', message: 'there is not any users' });
// 	}
// 	res.status(200).json({ status: '200', data: users });
// });

//create new User
router.post('/users/create', async (req: Request, res: Response) => {
	const { email, password, name, role } = req.body;
	const pass = PasswordService.hashpassword(password);
	const user = await prisma.user.create({
		data: { email, password: (await pass).toString(), name, role },
		select: { id: true, email: true },
	});
	res.json({
		status: 201,
		data: user,
		message: 'new user created successfully',
	});
});

router.post('/login', async (req: Request, res: Response) => {
	const body: bodyloginInput = req.body;
	const user = await prisma.user.findUnique({ where: { email: body.email } });
	if (!user) {
		throw new nonauthorization();
	}
	const ispasscorrect = await PasswordService.verifypassword(
		user.password,
		body.password
	);
	if (!ispasscorrect) {
		throw new nonauthorization();
	}
	res.json({
		status: 200,
		data: user,
		message: 'you already in the your account ',
	});
});

export { router as userRouter };
