import jwt from "jsonwebtoken";
import { generateMessages } from "../generate-message";

class Auth {
	constructor() { }

	auth(req, res, next) {
		let token = req.headers["authorization"];

		if (!token) throw generateMessages('ACCESS_IS_FORBIDDEN');
		try {
			token = token.split(' ')[1];
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decode;
		} catch (err) {
			throw generateMessages('INVALID_TOKEN');
		}

		return next();
	}

	generateToken(id, role, permissions) {
		const user = { id: id, role: role, permissions: permissions };
		const accessToken = jwt.sign(user, process.env.JWT_SECRET);
		return accessToken;
	}

	checkrole(req, res, next) {
		try {
			if (req.user.role === 'Super Admin' || req.user.role === 'master') return next();

			else throw generateMessages('ACCESS_IS_FORBIDDEN');
		}
		catch (error) {
			next(error);
		}
	}
}

module.exports = new Auth();
