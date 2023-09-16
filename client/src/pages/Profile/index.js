import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import DiveList from '../../components/DiveList';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import Container from 'react-bootstrap/Container';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const numDives = (user.dives ?? []).length;

  const navigate = useNavigate();

  useEffect(() => {
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
      return navigate("/me");
    }
  });

  // Create a new array by sorting the dives based on the dive date property
  const sortedDives = (user.dives || []).slice().sort((a, b) => new Date(b.diveDate) - new Date(a.diveDate));


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <Container>

      <h2 className="mb-4">
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
      </h2>

      <p>{numDives} dives logged</p>

      <h4>{`${user.username}'s dives:`}</h4>
      <Container>
        <DiveList
          dives={sortedDives}
          // title={`${user.username}'s dives:`}
          // showTitle={false}
          showUsername={false}
        />
      </Container>

    </Container>
  )

};

export default Profile;
