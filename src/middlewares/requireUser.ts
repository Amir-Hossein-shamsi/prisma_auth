import { customError, nonauthorization } from 'commonefunchanddlers';
import { Request, Response, NextFunction } from 'express';
import log from '../utils/logger';

export const requireUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = res.locals.user;

	if (!user) {
		throw new nonauthorization();
	}

	return next();
};

export const requireAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = res.locals.user;
	log.warn(user.role);
	if (user.role != 'ADMIN') {
		throw new customError('first of all yo be a Admin', 401);
	}

	return next();
};
