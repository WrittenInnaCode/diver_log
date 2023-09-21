import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
	query Query {
		users {
			username
			email
      avatar
      userBio
			_id
		}
	}
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      avatar
      userBio
      dives {
        _id
        diveSite
        diveDate
        timeIn
        timeOut
        startPsi
        endPsi
        diveText
        diveBuddy
        diveLife
        temperature
        visibility
        current
        maxDepth
        weights
        rating
        divePhoto
        diveAuthor
        createdAt
    }
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      avatar
      userBio
      dives {
        _id
        diveSite
        diveDate
        timeIn
        timeOut
        startPsi
        endPsi
        diveText
        diveBuddy
        diveLife
        temperature
        visibility
        current
        maxDepth
        weights
        rating
        divePhoto
        diveAuthor
        createdAt
    }
    }
  }
`;


export const QUERY_DIVES = gql`
  query getDives {
    dives {
      _id
      diveSite
      diveDate
      timeIn
      timeOut
      startPsi
      endPsi
      diveText
      diveBuddy
      diveLife
      temperature
      visibility
      current
      maxDepth
      weights
      rating
      divePhoto
      diveAuthor
      createdAt
    }
  }
`;


export const QUERY_SINGLE_DIVE = gql`
  query getSingleDive($diveId: ID!) {
    dive(diveId: $diveId) {
      _id
      diveSite
      diveDate
      timeIn
      timeOut
      startPsi
      endPsi
      diveText
      diveBuddy
      diveLife
      temperature
      visibility
      current
      maxDepth
      weights
      rating
      divePhoto
      diveAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;