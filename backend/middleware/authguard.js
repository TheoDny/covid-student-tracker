const jwt = require("jsonwebtoken")
const SECRET_TOKEN =
	process.env.SECRET_TOKEN || require("../.secret.js").SECRET_TOKEN

module.exports = (req, res, next) => {
	try {
		if (req.headers.authorization === undefined)
			throw new Error("Authguard Unauthorized")
		const token = req.headers.authorization.split(" ")[1]
		const decodedToken = jwt.verify(token, SECRET_TOKEN)
		const userId = decodedToken.userId

		if (req.body.userId && req.body.userId !== userId) {
			throw new Error("Invalid user ID")
		} else {
			next()
		}
	} catch (error) {
		console.log("error", error)
		res.status(401).json({
			error: new Error("Invalid request"),
		})
	}
}
