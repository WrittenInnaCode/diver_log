import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
	query Query {
		users {
			username
			email
			_id
		}
	}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
     
    }
  }
`;