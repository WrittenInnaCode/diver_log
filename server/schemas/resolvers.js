const { AuthenticationError } = require('apollo-server-express');
const { User, Dive } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			// return await User.find({}).select('-password');
			// return User.find().populate('dives');
			return await User.find({}).select('-password').populate('dives');
		},
		user: async (parent, { username }) => {
			return User.findOne({ username }).populate('dives');
		},
		dives: async (parent, { username }) => {
			const params = username ? { username } : {};
			return Dive.find(params).sort({ _id: -1 });
		},
		dive: async (parent, { diveId }) => {
			return Dive.findOne({ _id: diveId });
		},
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('dives');
				// const userData = await User.findOne({ _id: context.user._id }).populate('dives')
				// .select('-__v -password');

				return userData;
			}

			throw new AuthenticationError('Not logged in');
		}
	},

	Mutation: {
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);
			return { token, user };
		},

		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('No user found with this email address');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);

			return { token, user };
		},

		addDive: async (parent, { diveSite, diveText, diveBuddy, diveLife, diveImage }, context) => {
			if (context.user) {
				const dive = await Dive.create({
					diveSite,
					diveText,
					diveLife,
					diveBuddy,
					diveImage,
					diveAuthor: context.user.username,
				});

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { dives: dive._id } }
				);

				return dive;
			}
			throw new AuthenticationError('You need to be logged in!');
		},

		addComment: async (parent, { diveId, commentText }, context) => {
			if (context.user) {
				return Dive.findOneAndUpdate(
					{ _id: diveId },
					{
						$addToSet: {
							comments: { commentText, commentAuthor: context.user.username },
						},
					},
					{
						new: true,
						runValidators: true,
					}
				);
			}
			throw new AuthenticationError('You need to be logged in!');
		},

		removeDive: async (parent, { diveId }, context) => {
			if (context.user) {
				const dive = await Dive.findOneAndDelete({
					_id: diveId,
					diveAuthor: context.user.username,
				});

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { dives: dive._id } }
				);

				return dive;
			}
			throw new AuthenticationError('You need to be logged in!');
		},

		editDive: async (parent, { diveId, diveSite, diveText, diveBuddy, diveLife, diveImage }, context) => {
			if (context.user) {
				const dive = await Dive.findByIdAndUpdate(diveId, {
					$set: {
					diveSite,
					diveText,
					diveBuddy,
					diveLife,
					diveImage,
					}
				});
				return dive;
			}
			throw new AuthenticationError('You need to be logged in!');
		},

		removeComment: async (parent, { diveId, commentId }, context) => {
			if (context.user) {
				return Dive.findOneAndUpdate(
					{ _id: diveId },
					{
						$pull: {
							comments: {
								_id: commentId,
								commentAuthor: context.user.username,
							},
						},
					},
					{ new: true }
				);
			}
			throw new AuthenticationError('You need to be logged in!');
		},

	},
};

module.exports = resolvers;
