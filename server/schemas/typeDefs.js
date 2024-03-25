const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		dives: [Dive]!
		avatar: String
  		userBio: String
		comments: [Comment]
		likes: [Like]
	}

	type Dive {
    	_id: ID
		diveSite: String
		diveDate: String
		timeIn: String
		timeOut: String
		startPsi: String
		endPsi: String
		diveText: String
		diveBuddy: String
		diveLife: String
		temperature: String
        visibility: String
        current: String
        maxDepth: String
        weights: String
		rating: Int
		divePhoto: [String]
		author: User
    	createdAt: String
    	comments: [Comment]
		likes: [Like]
  	}

  	type Comment {
    	_id: ID
    	commentText: String
    	commentAuthor: User
    	createdAt: String
  	}

	type Like {
        _id: ID
        likedBy: User
    }

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		users: [User]
		user(username: String!): User
		dives(username: String): [Dive]
		dive(diveId: ID!): Dive
		me: User
	}


	type Mutation {
		addUser(
		username: String!, 
		email: String!, 
		password: String!): Auth

		login(email: String!, password: String!): Auth

		updateUserAvatar(avatar: String!): User
		
		updateUserBio(userBio: String!): User

		addDive(
			diveSite: String!, 
			diveDate: String!, 
			timeIn: String!, 
			timeOut: String!, 
			startPsi: String!,
		    endPsi: String!,
			diveText: String!, 
			diveBuddy: String!, 
			diveLife: String!,
	    	temperature: String!, 
            visibility: String!, 
            current: String!, 
            maxDepth: String!, 
            weights: String!,
			rating: Int!,
			divePhoto: [String]!
			): Dive

		editDive(
			diveId: ID!, 
			diveSite: String!, 
			diveDate: String!, 
			timeIn: String!, 
			timeOut: String!, 
			startPsi: String!,
		    endPsi: String!,
			diveText: String!, 
			diveBuddy: String!, 
			diveLife: String!,
	    	temperature: String!, 
            visibility: String!, 
            current: String!, 
            maxDepth: String!, 
            weights: String!,
			rating: Int!,
			divePhoto: [String]!
			): Dive

		removeDive(diveId: ID!): Dive

    	addComment(diveId: ID!, commentText: String!): Dive
    
    	removeComment(diveId: ID!, commentId: ID!): Dive

		likeDive(diveId: ID!): Dive
		
		unlikeDive(diveId: ID!): Dive

	}
`;

module.exports = typeDefs;
