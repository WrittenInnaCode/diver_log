const { AuthenticationError } = require('apollo-server-express');
const { User, Dive } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

	Dive: {
		author: async (dive, args, context) => {
			try {
				const user = await User.findById(dive.author);
				return user;
			} catch (error) {
				throw new Error('Error fetching dive author: ' + error.message);
			}
		},
	},

	Comment: {
		commentAuthor: async (comment, args, context) => {
			try {
				const user = await User.findById(comment.commentAuthor);
				return user;
			} catch (error) {
				throw new Error('Error fetching comment author: ' + error.message);
			}
		},
	},

	Like: {
		likedBy: async (like, args, context) => {
			try {
				const user = await User.findById(like.likedBy);
				return user;
			} catch (error) {
				throw new Error('Error fetching username of a like: ' + error.message);
			}
		},
	},

	Query: {
		users: async () => {
			return await User.find({}).select('-password').populate('dives');
		},
		user: async (parent, { username }) => {
			return User.findOne({ username }).select('-password').populate('dives');
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


		updateUserAvatar: async (_, { avatar }, context) => {
			try {
				if (!context.user) {
					throw new Error('You must be authenticated to update your avatar.');
				}

				const updatedUser = await User.findByIdAndUpdate(
					context.user._id,
					{ avatar },
					{ new: true } // Return the updated user
				);

				return updatedUser;
			} catch (error) {
				throw new Error(`Failed to update user's avatar: ${error.message}`);
			}
		},

		updateUserBio: async (_, { userBio }, context) => {
			try {
				if (!context.user) {
					throw new Error('You must be authenticated to update your bio.');
				}

				const updatedUser = await User.findByIdAndUpdate(
					context.user._id,
					{ userBio },
					{ new: true } // Return the updated user
				);

				return updatedUser;
			} catch (error) {
				throw new Error(`Failed to update user bio: ${error.message}`);
			}
		},

		addDive: async (parent, {
			diveSite,
			diveDate,
			timeIn,
			timeOut,
			startPsi,
			endPsi,
			diveText,
			diveBuddy,
			diveLife,
			temperature,
			visibility,
			current,
			maxDepth,
			weights,
			rating,
			divePhoto
		}, context) => {
			if (context.user) {
				const dive = await Dive.create({
					diveSite,
					diveDate,
					timeIn,
					timeOut,
					startPsi,
					endPsi,
					diveText,
					diveLife,
					temperature,
					visibility,
					current,
					maxDepth,
					weights,
					rating,
					diveBuddy,
					divePhoto,
					author: context.user._id,
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
				const comment = {
					commentText,
					commentAuthor: context.user._id
				};

				const updatedDive = await Dive.findOneAndUpdate(
					{ _id: diveId },
					{ $push: { comments: comment } },
					{ new: true }
				);
				return updatedDive;
			}
			throw new AuthenticationError('You need to be logged in to add a comment.');
		},

		removeComment: async (parent, { diveId, commentId }, context) => {
			if (context.user) {
				const dive = await Dive.findOneAndUpdate(
					{ _id: diveId },
					{
						$pull: {
							comments: {
								_id: commentId,
								commentAuthor: context.user._id,
							},
						},
					},
					{ new: true }
				);

				return dive;
			}
			throw new AuthenticationError('You need to be logged in to remove a comment.');
		},

		editDive: async (parent, {
			diveId,
			diveSite,
			diveDate,
			timeIn,
			timeOut,
			startPsi,
			endPsi,
			diveText,
			diveBuddy,
			diveLife,
			temperature,
			visibility,
			current,
			maxDepth,
			weights,
			rating,
			divePhoto
		}, context) => {
			if (context.user) {
				const dive = await Dive.findByIdAndUpdate(diveId, {
					$set: {
						diveSite,
						diveDate,
						timeIn,
						timeOut,
						startPsi,
						endPsi,
						diveText,
						diveBuddy,
						diveLife,
						diveLife,
						temperature,
						visibility,
						current,
						maxDepth,
						weights,
						rating,
						divePhoto
					}
				});
				return dive;
			}
			throw new AuthenticationError('You need to be logged in!');
		},

		removeDive: async (parent, { diveId }, context) => {
			if (context.user) {
				const dive = await Dive.findOneAndDelete({
					_id: diveId,
					author: context.user._id,
				});

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { dives: dive._id } }
				);

				return dive;
			}
			throw new AuthenticationError('You need to be logged in!');
		},


		likeDive: async (_, { diveId }, context) => {
			try {

				if (!context.user || !context.user._id) {
					throw new Error('User ID is not defined in the context.');
				}

				const userId = context.user._id;
				const dive = await Dive.findById(diveId);

				if (!dive) {
					throw new Error('Dive not found.');
				}


				// Check if the user has already liked the dive
				const alreadyLikedIndex = dive.likes.findIndex(like => like.likedBy && like.likedBy.toString() === userId.toString());

				if (alreadyLikedIndex !== -1) {
					// If the user has already liked the dive, remove the like
					dive.likes.splice(alreadyLikedIndex, 1);
				} else {
					// If the user hasn't liked the dive, add the like
					dive.likes.push({ likedBy: userId });
				}
				// console.log('User ID:', userId);
				await dive.save();

				return dive;
			} catch (error) {
				throw new Error(`Failed to like/unlike dive post: ${error.message}`);
			}
		}


	},

};

module.exports = resolvers;
