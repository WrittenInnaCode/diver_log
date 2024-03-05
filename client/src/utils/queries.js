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
    avatar
    userBio
    email
    dives {
      _id
      createdAt
      current
      diveBuddy
      diveDate
      diveLife
      divePhoto
      diveSite
      diveText
      endPsi
      maxDepth
      rating
      startPsi
      temperature
      timeIn
      timeOut
      visibility
      weights
      author {
        username
        _id
      }
      comments {
        commentAuthor {
         username
       }
        commentText
      }
      likes {
      _id
      likedBy {
        _id
        username
      }
    }
    }
  }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
    _id
    avatar
    email
    userBio
    username
    dives {
      _id
      createdAt
      current
      diveBuddy
      diveDate
      diveLife
      divePhoto
      diveSite
      diveText
      endPsi
      maxDepth
      rating
      startPsi
      temperature
      timeIn
      timeOut
      visibility
      weights
      author {
       _id
       username
      }
      comments {
       commentAuthor {
         username
       }
       commentText
      }
      likes {
      _id
      likedBy {
        _id
        username
      }
    }
    }
  }
  }
`;


export const QUERY_DIVES = gql`
  query getDives {
    dives {
    _id
    author {
      _id
      username
      avatar
    }
    comments {
      commentAuthor {
        username
      }
      commentText
    }
    likes {
      _id
      likedBy {
        _id
        username
      }
    }
    createdAt
    current
    diveBuddy
    diveDate
    diveLife
    diveSite
    diveText
    divePhoto
    endPsi
    maxDepth
    rating
    startPsi
    temperature
    timeIn
    timeOut
    visibility
    weights
  }
  }
`;


export const QUERY_SINGLE_DIVE = gql`
  query getSingleDive($diveId: ID!) {
    dive(diveId: $diveId) {
      _id
      createdAt
      current
      diveBuddy
      diveDate
      diveLife
      diveSite
      diveText
      divePhoto
      endPsi
      maxDepth
      rating
      startPsi
      temperature
      timeIn
      timeOut
      visibility
      weights
      author {
        _id
        username
        avatar
      }
      comments {
        _id
        commentText
        createdAt
        commentAuthor {
          _id
          avatar
          username
        }
      }
      likes {
          _id
          likedBy {
            _id
            username
      }
    }
    }
  }
`;