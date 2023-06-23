import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useQuery,
  //  useMutation 
} from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import { Modal, Tab, Tabs } from 'react-bootstrap';
import Login from '../../components/Login';
import Signup from '../../components/Signup';

import Auth from '../../utils/auth';

const Profile = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const navigate = useNavigate();
  //is this working????????

// Modal 
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);


  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return  navigate("/me");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div>
        <Modal 
        show={show} 
        onHide={handleClose} 
        backdrop="static"
        keyboard={false}
        centered>
          <Modal.Header>
            <Modal.Title>You need to be logged in to see this.</Modal.Title>
          </Modal.Header>

          <Modal.Body className="bg-light">
            <Tabs
              defaultActiveKey="login"
              className="mb-3, modalTabs"
              fill
              justify
              id="modalTabs"
            >

              <Tab eventKey="login" title="Log In">
                <Login />
              </Tab>

              <Tab eventKey="signup" title="Sign Up">
                <Signup />
              </Tab>

            </Tabs>

          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Welcome, {Auth.getProfile().data.username}!
      </h1>

      <div>
        <aside>
          <nav>
            <ul>
              <li>

              </li>
              <li>

              </li>
              <li>

              </li>
            </ul>
          </nav>
        </aside>
      </div>

    </div>
  )

};

export default Profile;
