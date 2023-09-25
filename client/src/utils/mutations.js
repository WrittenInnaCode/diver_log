import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
        token
        user {
           _id
           username
         }
      }
  }
`;


export const ADD_DIVE = gql`
mutation Mutation($diveSite: String!, $diveDate: String!, $timeIn: String!, $timeOut: String!, $startPsi: String!, $endPsi: String!, $diveText: String!, $diveBuddy: String!, $diveLife: String!, $temperature: String!, $visibility: String!, $current: String!, $maxDepth: String!, $weights: String!, $rating: Int!) {
  addDive(diveSite: $diveSite, diveDate: $diveDate, timeIn: $timeIn, timeOut: $timeOut, startPsi: $startPsi, endPsi: $endPsi, diveText: $diveText, diveBuddy: $diveBuddy, diveLife: $diveLife, temperature: $temperature, visibility: $visibility, current: $current, maxDepth: $maxDepth, weights: $weights, rating: $rating) {
    _id
    createdAt
    current
    diveBuddy
    diveDate
    diveLife
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
      avatar
    }
    comments {
      _id
      commentText
    }
  }
}
`;


export const REMOVE_DIVE = gql`
  mutation removeDive($diveId: ID!) {
    removeDive(diveId: $diveId) {
    _id
    createdAt
    current
    diveBuddy
    diveDate
    diveLife
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
      avatar
      username
    }
    comments {
      _id
      commentAuthor {
        _id
        avatar
        username
      }
      commentText
      createdAt
    }
  }
  }
`;


export const EDIT_DIVE = gql`
mutation EditDive($diveId: ID!, $diveSite: String!, $diveDate: String!, $timeIn: String!, $timeOut: String!, $startPsi: String!, $endPsi: String!, $diveText: String!, $diveBuddy: String!, $diveLife: String!, $temperature: String!, $visibility: String!, $current: String!, $maxDepth: String!, $weights: String!, $rating: Int!) {
  editDive(diveId: $diveId, diveSite: $diveSite, diveDate: $diveDate, timeIn: $timeIn, timeOut: $timeOut, startPsi: $startPsi, endPsi: $endPsi, diveText: $diveText, diveBuddy: $diveBuddy, diveLife: $diveLife, temperature: $temperature, visibility: $visibility, current: $current, maxDepth: $maxDepth, weights: $weights, rating: $rating) {
    _id
    current
    diveBuddy
    diveDate
    diveLife
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
  }
}
`;


export const ADD_COMMENT = gql`
  mutation addComment($diveId: ID!, $commentText: String!) {
    addComment(diveId: $diveId, commentText: $commentText) {
    comments {
      _id
      commentText
      createdAt 
      commentAuthor {
        _id
        username
        avatar
      }
    }
    _id
    createdAt
    current
    diveBuddy
    diveDate
    diveLife
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
      avatar
      username
    }
  }
  }
`;
