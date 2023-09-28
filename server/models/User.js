const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, 'Must use a valid email address'],
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default: 'https://res.cloudinary.com/dbudwdvhb/image/upload/v1695613228/octocat-1695613200506_eei2mk.png',
		},
		userBio: {
			type: String,
			default: '',
		},
		dives: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Dive',
			},
		],
	},
	// set this to use virtual below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// hash user password
userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
