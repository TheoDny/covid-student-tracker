const express = require("express")
const mongoose = require("mongoose")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const authguard = require("./middleware/authguard")

require("dotenv").config()
const PORT = process.env.PORT || 3001
const SECRET_URL_MDB =
	process.env.SECRET_URL_MDB || require("./.secret.js").SECRET_URL_MDB

const controllerPupilsDb = require("./controllers/controllerPupilsDb")
const userController = require("./controllers/controllerUser")

var cors = require("cors")
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// === Mongoose connect to MongoDB === //
const db = mongoose.connection

mongoose.connect(SECRET_URL_MDB)
db.on(
	"error",
	console.error.bind(console, "connection error: cannot connect to DB")
)
db.once("open", () => {
	console.info("Connected to DB")
})
// ================================== //

// ============== Get =============== //

app.get("/api/pupils", authguard, controllerPupilsDb.getPupils)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "..", "client", "build")))

	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
	})
}
// ================================== //

// ============== Post ============== //

// app.post("/api/auth/signup", userController.signup) no need for that
app.post("/api/auth/login", userController.login)

app.post("/api/pupils/add", authguard, controllerPupilsDb.addPupil)

app.post("/api/pupils/deleteone", authguard, controllerPupilsDb.deleteOnePupil)

app.post("/api/pupils/updateone", authguard, controllerPupilsDb.updateOnePupil)
app.post(
	"/api/pupils/updatemany",
	authguard,
	controllerPupilsDb.updateManyPupils
)

// ================================== //

app.listen(PORT, () => {
	console.log(`Example app listening at http://localhost:${PORT}`)
})
