import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import DiveList from '../../components/DiveList';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import Container from 'react-bootstrap/Container';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
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

  
 // Calculate the maximum depth
  let maxDepth = 0; // Initialize maxDepth to 0

  sortedDives.forEach((dive) => {
    if (dive.maxDepth > maxDepth) {
      maxDepth = dive.maxDepth; // Update maxDepth if a deeper dive is found
    }
  });


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>

      {/* <h2 className="mb-4">
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
      </h2> */}

      <Container className="userDetails p-4">
        <h3 className='text-primary text-opacity-50 pb-3'>{`${user.username}`}</h3>
        <p>{numDives} dives logged</p>
        <p>Max depth: {maxDepth} FT</p>
      </Container>



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
