import React, { useEffect } from 'react';
// import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import DiveList from '../../components/DiveList';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

// import { Modal, Tab, Tabs } from 'react-bootstrap';
// import Login from '../../components/Login';
// import Signup from '../../components/Signup';

import Auth from '../../utils/auth';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const navigate = useNavigate();

  // Modal 
  // const [show, setShow] = useState(true);
  // const handleClose = () => setShow(false);

useEffect(() => {
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return navigate("/me");
  }
});
  

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return (
  //     <div>
  //       <Modal 
  //       show={show} 
  //       onHide={handleClose} 
  //       backdrop="static"
  //       keyboard={false}
  //       centered>
  //         <Modal.Header>
  //           <Modal.Title>You need to be logged in to see this.</Modal.Title>
  //         </Modal.Header>

  //         <Modal.Body className="bg-light">
  //           <Tabs
  //             defaultActiveKey="login"
  //             className="mb-3, modalTabs"
  //             fill
  //             justify
  //             id="modalTabs"
  //           >

  //             <Tab eventKey="login" title="Log In">
  //               <Login />
  //             </Tab>

  //             <Tab eventKey="signup" title="Sign Up">
  //               <Signup />
  //             </Tab>

  //           </Tabs>

  //         </Modal.Body>
  //         <Modal.Footer>
  //         </Modal.Footer>
  //       </Modal>
  //     </div>
  //   );
  // }

  return (
    <div>

      {/* <h2>
        Welcome, {Auth.getProfile().data.username}!
      </h2> */}

      <h2>
        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
      </h2>


      <div className="col-12 col-md-10 mb-5">
        <DiveList
          dives={user.dives}
          title={`${user.username}'s dives...`}
          showTitle={false}
          showUsername={false}
        />
      </div>

    </div>
  )

};

export default Profile;
