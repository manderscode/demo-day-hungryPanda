// load the things we need
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

// define the schema for our user model
var userSchema = mongoose.Schema({
	local: {
		name: String,
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		groceryStoreName: {
			type: String,
			required: true,
		},
		message: {
			type: String,
		},
	},
})

// generating a hash
userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password)
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema)