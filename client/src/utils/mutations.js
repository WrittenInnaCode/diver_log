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
  mutation addDive($diveSite: String!, $diveDate: String!, $timeIn: String!, $timeOut: String!, $startPsi: String!, $endPsi: String!, $diveText: String!, $diveBuddy: String!, $diveLife: String!) {
    addDive(diveSite: $diveSite, diveDate: $diveDate, timeIn: $timeIn, timeOut: $timeOut, startPsi: $startPsi, endPsi: $endPsi, diveText: $diveText, diveBuddy: $diveBuddy, diveLife: $diveLife) {
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
  mutation editDive($diveId: ID!, $diveSite: String!, $diveDate: String!, $timeIn: String!, $timeOut: String!, $startPsi: String!, $endPsi: String!, $diveText: String!, $diveBuddy: String!, $diveLife: String!, $diveImage: String!) {
    editDive(diveId: $diveId, diveSite: $diveSite, diveDate: $diveDate, timeIn: $timeIn, timeOut: $timeOut, startPsi: $startPsi, endPsi: $endPsi, diveText: $diveText, diveBuddy: $diveBuddy, diveLife: $diveLife, diveImage: $diveImage) {
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
