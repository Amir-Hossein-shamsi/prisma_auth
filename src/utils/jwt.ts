import jwt from 'jsonwebtoken';
import config from 'config';
import log from './logger';

//TODO: give access token to User
export async function Signjwt(
	object: Object,
	keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
	options?: jwt.SignOptions | undefined
) {
	const signingKey = Buffer.from(
		config.get<string>(keyName),
		'base64'
	).toString('ascii');

	const token = jwt.sign(object, signingKey, {
		...(options && options),
		algorithm: 'RS256',
	});

	return token;
}

//TODO: check access token and verify it
export function Verifyjwt<T>(
	token: string,
	keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) {
	const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString(
		'ascii'
	);
	log.warn('ther is');
	try {
		const decoded = jwt.verify(token, publicKey) as T;
		return decoded;
	} catch (e) {
		return null;
	}
}
