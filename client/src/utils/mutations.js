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
  mutation addUser(
    $username: String!, 
    $email: String!, 
    $password: String!
    $avatar: String!, 
    $userBio: String!) {

      addUser(
       username: $username, 
       email: $email, 
       password: $password,
       avatar: $avatar, 
       userBio: $userBio,) {

        token
        user {
           _id
           username
         }
      }
  }
`;



export const ADD_DIVE = gql`
  mutation addDive(
  $diveSite: String!, 
  $diveDate: String!, 
  $timeIn: String!, 
  $timeOut: String!, 
  $startPsi: String!, 
  $endPsi: String!, 
  $diveText: String!, 
  $diveBuddy: String!, 
  $diveLife: String!, 
  $temperature: String!, 
  $visibility: String!, 
  $current: String!, 
  $maxDepth: String!, 
  $weights: String!, 
  $rating: Int!
  $divePhoto: String!) {

    addDive(
      diveSite: $diveSite, 
      diveDate: $diveDate, 
      timeIn: $timeIn, 
      timeOut: $timeOut, 
      startPsi: $startPsi, 
      endPsi: $endPsi, 
      diveText: $diveText, 
      diveBuddy: $diveBuddy, 
      diveLife: $diveLife, 
      temperature: $temperature, 
      visibility: $visibility, 
      current: $current, 
      maxDepth: $maxDepth, 
      weights: $weights, 
      rating: $rating,
      divePhoto: $divePhoto) {

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
      rating
      divePhoto
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
  mutation editDive(
  $diveId: ID!, 
  $diveSite: String!, 
  $diveDate: String!, 
  $timeIn: String!, 
  $timeOut: String!, 
  $startPsi: String!, 
  $endPsi: String!, 
  $diveText: String!, 
  $diveBuddy: String!, 
  $diveLife: String!, 
  $temperature: String!, 
  $visibility: String!, 
  $current: String!, 
  $maxDepth: String!, 
  $weights: String!, 
  $rating: Int!, 
  $divePhoto: String!) {

    editDive(
      diveId: $diveId, 
      diveSite: $diveSite, 
      diveDate: $diveDate, 
      timeIn: $timeIn, 
      timeOut: $timeOut, 
      startPsi: $startPsi, 
      endPsi: $endPsi, 
      diveText: $diveText, 
      diveBuddy: $diveBuddy, 
      diveLife: $diveLife, 
      temperature: $temperature, 
      visibility: $visibility, 
      current: $current, 
      maxDepth: $maxDepth, 
      weights: $weights, 
      rating: $rating, 
      divePhoto: $divePhoto) {

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
      rating
      divePhoto
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
