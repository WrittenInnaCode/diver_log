const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		dives: [Dive]!
	}

	type Dive {
    	_id: ID
		diveSite: String
		diveText: String
		diveBuddy: String
		diveLife: String
    	diveAuthor: String
    	createdAt: String
		diveImage: String
    	comments: [Comment]!
  	}

  	type Comment {
    	_id: ID
    	commentText: String
    	commentAuthor: String
    	createdAt: String
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
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		addDive(diveSite: String!, diveText: String!, diveBuddy: String!, diveImage: String!): Dive
    	addComment(diveId: ID!, commentText: String!): Dive
    	removeDive(diveId: ID!): Dive
		editDive(diveId: ID!, diveSite: String!, diveText: String!, diveBuddy: String!, diveImage: String!): Dive
    	removeComment(diveId: ID!, commentId: ID!): Dive
	}
`;

module.exports = typeDefs;
