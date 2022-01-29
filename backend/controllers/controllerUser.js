const bcrypt = require("bcrypt")
const User = require("../schema/user")
const jwt = require("jsonwebtoken")
const SECRET_TOKEN =
	process.env.SECRET_TOKEN || require("./../.secret.js").SECRET_TOKEN

/**
 *	sign up in db and hash with bcrypt the password
 *
 * @param {{body : { email: string, password : string}}} req
 * @param res
 */
exports.signup = (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				email: req.body.email,
				password: hash,
			})

			user
				.save()
				.then(() =>
					res.status(200).json({
						userId: user._id,
						token: jwt.sign({ userId: user._id }, SECRET_TOKEN, {
							expiresIn: "7d",
						}),
					})
				)
				.catch((error) => res.status(400).json({ error }))
		})
		.catch((error) => res.status(500).json({ error }))
}

/**
 * log in by comparing the email's password with password hashed using bcrypt
 *
 * @param {{body : { email: string, password : string}}} req
 * @param res
 */
exports.login = (req, res) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "User not found" })
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Password invalid" })
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign({ userId: user._id }, SECRET_TOKEN, {
							expiresIn: "7d",
						}),
					})
				})
				.catch((error) => {
					res.status(500).json({ error })
				})
		})
		.catch((error) => res.status(500).json({ error }))
}
