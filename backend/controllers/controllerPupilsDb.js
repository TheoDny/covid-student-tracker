const Pupil = require("../schema/pupil")

/**
 *	add a Pupil to DB
 *
 * @param { {body : { surname: string,name: string,positive: boolean,positiveDate: string,contact: boolean,contactDate: string }}} req
 * @param res
 */
exports.addPupil = (req, res) => {
	const newPupil = new Pupil({
		name: req.body.name,
		surname: req.body.surname,
		positive: req.body.positive,
		positiveDate: req.body.positiveDate,
		contact: req.body.contact,
		contactDate: req.body.contactDate,
	})
	newPupil.save((err, pupil) => {
		if (err) {
			console.error(err)
			return
		} else {
			console.info("Pupil : ", pupil.name, pupil.surname, " added to DB")
			res.send(pupil)
		}
	})
}

/**
 *
 * get all pupils in DB
 * @param {*} req
 * @param {*} res
 */
exports.getPupils = (req, res) => {
	Pupil.find((err, pupils) => {
		if (err) {
			console.error(err)
			res.sendStatus(500).json({ err })
		} else {
			res.send(pupils)
		}
	})
}

/**
 * delete a pupil in db
 *
 * @param {*} req
 * @param {*} res
 */
exports.deleteOnePupil = (req, res) => {
	Pupil.deleteOne(req.body, (err) => {
		if (err) {
			console.error(err)
			res.sendStatus(500).json({ err })
		} else {
			console.info(
				"Pupil : ",
				req.body.name,
				req.body.surname,
				" removed from DB"
			)
			res.send("Pupil deleted")
		}
	})
}

/**
 *	update a Pupil to DB
 *
 * @param { {body : { surname: string,name: string,positive: boolean,positiveDate: string,contact: boolean,contactDate: string }}} req
 * @param res
 */
exports.updateOnePupil = (req, res) => {
	let id = req.body._id
	req.body._id = undefined
	Pupil.findByIdAndUpdate(id, req.body, { new: true }, (err, pupil) => {
		if (err) {
			console.error(err)
			return
		} else {
			console.info("Pupil : ", pupil.name, pupil.surname, " updated in DB")
			res.send(pupil)
		}
	})
}

/**
 *	update a Pupil to DB
 *
 * @param { {body : [ {_id : string , any : any } ] }} req
 * @param res
 */
exports.updateManyPupils = async (req, res) => {
	let id
	const arrayPromise = req.body.map((pupil) => {
		return new Promise((resolve, reject) => {
			id = pupil._id
			pupil._id = undefined

			Pupil.findByIdAndUpdate(id, pupil, { new: true }, (err, pupil) => {
				if (err) {
					console.error(err)
					reject(err)
					return
				} else {
					console.info("Pupil : ", pupil.name, pupil.surname, " updated in DB")
					resolve(pupil)
				}
			})
		})
	})
	Promise.all(arrayPromise)
		.then((updatedPupils) => {
			res.send(updatedPupils)
		})
		.catch((error) => res.sendStatus(500).json({ error }))
}
