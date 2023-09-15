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
  mutation addDive($diveSite: String!, $diveDate: String!, $timeIn: String!, $timeOut: String!, $startPsi: String!, $endPsi: String!, $diveText: String!, $diveBuddy: String!, $diveLife: String!, $temperature: String!, $visibility: String!, $current: String!, $maxDepth: String!, $weights: String!) {
    addDive(diveSite: $diveSite, diveDate: $diveDate, timeIn: $timeIn, timeOut: $timeOut, startPsi: $startPsi, endPsi: $endPsi, diveText: $diveText, diveBuddy: $diveBuddy, diveLife: $diveLife, temperature: $temperature, visibility: $visibility, current: $current, maxDepth: $maxDepth, weights: $weights) {
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
      diveAuthor
      createdAt
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
      diveAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;


export const EDIT_DIVE = gql`
  mutation editDive($diveId: ID!, $diveSite: String!, $diveDate: String!, $timeIn: String!, $timeOut: String!, $startPsi: String!, $endPsi: String!, $diveText: String!, $diveBuddy: String!, $diveLife: String!, $temperature: String!, $visibility: String!, $current: String!, $maxDepth: String!, $weights: String!, $diveImage: String!) {
    editDive(diveId: $diveId, diveSite: $diveSite, diveDate: $diveDate, timeIn: $timeIn, timeOut: $timeOut, startPsi: $startPsi, endPsi: $endPsi, diveText: $diveText, diveBuddy: $diveBuddy, diveLife: $diveLife, temperature: $temperature, visibility: $visibility, current: $current, maxDepth: $maxDepth, weights: $weights, diveImage: $diveImage) {
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
      diveImage
    }
  }
`;


export const ADD_COMMENT = gql`
  mutation addComment($diveId: ID!, $commentText: String!) {
    addComment(diveId: $diveId, commentText: $commentText) {
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
      diveImage
      diveAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
