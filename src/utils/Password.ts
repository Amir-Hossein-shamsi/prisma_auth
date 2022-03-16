import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const asyncscrypt = promisify(scrypt);

export class PasswordService {
	static async hashpassword(password: string) {
		const salt = randomBytes(8).toString('hex');
		const BufferHash = (await asyncscrypt(password, salt, 64)) as Buffer;
		const postfix =
			'eW91IGNhbiBub3QgZGVjb2RlIG90aGlzIHBhc3MgcyBkbyBub3Qgd2Fpc3QgeW91IHRpbWU=';
		return `${salt}.${BufferHash.toString('hex')}.${postfix}`;
	}
	static async verifypassword(
		storepassword: string,
		pass: string
	): Promise<boolean> {
		const [salt, password, postfix] = storepassword.split('.', 3);
		const BufferHash = (await asyncscrypt(pass, salt, 64)) as Buffer;
		return BufferHash.toString('hex') === password;
	}
}
