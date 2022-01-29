const mongoose = require("mongoose");

const PupilSchema = mongoose.Schema({
	name: String,
	surname: String,
	positive: Boolean,
	positiveDate: String,
	contact: Boolean,
	contactDate: String,
});

module.exports = mongoose.model("Pupil", PupilSchema);
