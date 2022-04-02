import { customError, nonauthorization } from 'commonefunchanddlers';
import express, { Response, Request } from 'express';

import { Signjwt } from '../utils/jwt';
import { PasswordService } from '../utils/Password';
import { prisma } from '../utils/prisma';

import { requireAdmin, requireUser } from '../middlewares/requireUser';
const router = express.Router();

//list all of Users if your role be admin
router.get(
	'/users/list',
	requireUser,
	requireAdmin,
	async (req: Request, res: Response) => {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
			},
		});
		if (users.length === 0) {
			res
				.status(200)
				.json({ status: '200', message: 'there is not any users' });
		}
		res.status(200).json({ status: '200', data: users });
	}
);

router.get('/profile', async (req: Request, res: Response) => {
	res.send(res.locals.user || { profile: null });
});

//create new User (sighnUp)
router.post('/users/create', async (req: Request, res: Response) => {
	const { email, password, name, role } = req.body;
	const pass = PasswordService.hashpassword(password);
	try {
		const user = await prisma.user.create({
			data: { email, password: (await pass).toString(), name, role },
			select: { id: true, email: true, role: true },
		});
		const accessToken = await Signjwt(user, 'accessTokenPrivateKey', {
			expiresIn: '15m',
		});

		res.json({
			status: 201,
			accesstokent: accessToken,
			message: 'signUp  successfully',
		});
	} catch (e) {
		throw new customError(`${e}`, 400);
	}
});

//Login an give back access token and refresh token (sighnIn)
router.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (email === undefined || password === undefined) {
		throw new nonauthorization();
	}
	const user = await prisma.user.findUnique({ where: { email: email } });
	if (!user) {
		throw new nonauthorization();
	}
	const ispasscorrect = await PasswordService.verifypassword(
		user.password,
		password
	);
	if (!ispasscorrect) {
		throw new nonauthorization();
	}

	const accessToken = await Signjwt(
		{ email: user.email, id: user.id, role: user.role },
		'accessTokenPrivateKey',
		{
			expiresIn: '15m',
		}
	);
	const refreshToken = await Signjwt(
		{ email: user.email, id: user.id, role: user.role },
		'refreshTokenPrivateKey',
		{
			expiresIn: '1d',
		}
	);
	res.json({
		status: 200,
		accectoken: accessToken,
		refreshtoken: refreshToken,
		message: 'you already in the your account ',
	});
});

export { router as userRouter };
