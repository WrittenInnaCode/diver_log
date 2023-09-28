import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import DiveList from '../../components/DiveList';
import UploadWidget from '../../components/AvatarUploadWidget';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { UPDATE_BIO } from '../../utils/mutations';
import { UPDATE_AVATAR } from '../../utils/mutations';

import Auth from '../../utils/auth';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { MdSettings } from 'react-icons/md'; //edit button gear icon


const Profile = () => {

  const { username: userParam } = useParams();

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const [show, setShow] = useState(false);

  const [bio, setBio] = useState(() => user?.userBio || '');
  // const [avatar, setAvatar] = useState(user?.avatar || 'https://res.cloudinary.com/dbudwdvhb/image/upload/v1695613228/octocat-1695613200506_eei2mk.png');


  // For avatar preview to show current avatar (otherwise it shows the default avatar in the modal)
  const [avatar, setAvatar] = useState(null); // Initialize avatar state with user's current avatar or a default avatar

  useEffect(() => {
    if (user) {
      // Set avatar state when user data is available
      setAvatar(user.avatar || 'https://res.cloudinary.com/dbudwdvhb/image/upload/v1695613228/octocat-1695613200506_eei2mk.png');
    }
  }, [user]);
  //


  const maxCharacterLimit = 80;

  const handleClose = () => setShow(false);

  const handleShow = () => {
    // When Edit button is clicked, set `bio` state with the user's existing bio data
    setBio(user?.userBio || '');
    setShow(true);
  };


  const [updateBio] = useMutation(UPDATE_BIO, {
    onCompleted: (data) => {
      const updatedBio = data.updateUserBio.userBio;
      setBio(updatedBio); // Update the bio in the component state
      handleClose();
    },
  });

  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    onCompleted: (data) => {
      const updatedAvatar = data.updateUserAvatar.avatar;
      setAvatar(updatedAvatar);
      handleClose();
    },
  });


  useEffect(() => {
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
      return navigate("/me");
    }
  }, [navigate, userParam]);


  const handleProfileSave = () => {
    // Update bio
    updateBio({ variables: { userBio: bio } })
      .then((bioResult) => {
        // Handle success or error for bio update here
        const updatedBio = bioResult.data.updateUserBio.userBio;
        setBio(updatedBio); // Update the bio in the component state
      })
      .catch((bioError) => {
        // Handle error for bio update here
        console.error("Error updating bio:", bioError);
      });

    // Update avatar
    updateAvatar({ variables: { avatar } })
      .then((avatarResult) => {
        // Handle success or error for avatar update here
        const updatedAvatar = avatarResult.data.updateUserAvatar.avatar;
        setAvatar(updatedAvatar);
      })
      .catch((avatarError) => {
        // Handle error for avatar update here
        console.error("Error updating avatar:", avatarError);
      });

    // Close the modal
    handleClose();
  };


  const handleChange = (event) => {
    const text = event.target.value;
    // Ensure the bio doesn't exceed the character limit
    if (text.length <= maxCharacterLimit) {
      setBio(text);
    }
  };

  const isProfileOwner = Auth.loggedIn() && Auth.getProfile().data.username === user.username;


  const numDives = (user.dives ?? []).length;

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

      <Container fluid className="userInfo">
        <div className='d-flex '>
          <div>
            <Image className='userAvatar' roundedCircle
              src={user.avatar}
              alt={`${user.username}'s Avatar`} />
          </div>

          <div className='userDetails ps-3 pt-2'>

            <div className='d-flex justify-content-between'>
              <h3 className='text-primary text-opacity-50 pb-3'>{`${user.username}`}</h3>

              {/* Edit Profile Button */}
              {isProfileOwner && (
                <div className='px-2'>
                  <Button variant="outline-light" size="sm" className='d-flex justify-content-end'
                    onClick={handleShow}>
                    <MdSettings className='profileSettings' />
                  </Button>
                </div>
              )}

            </div>

            {user.userBio && (
              <div>
                <p className='userBio'>{user.userBio}</p>
              </div>
            )}

            <div className='d-flex fw-bolder'>
              <p className='pe-2'>{numDives} dives logged</p>
              <p className='ps-2'>Max depth: {maxDepth} FT</p>
            </div>

          </div>
        </div>
      </Container>



      <Container>
        <DiveList
          dives={sortedDives}
          // title={`${user.username}'s dives:`}
          // showTitle={false}
          showUsername={false}
        />
      </Container>



      <Modal show={show} onHide={handleClose} centered className='avatarModal'>
        <Modal.Header closeButton className='bg-dark text-white'>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-light'>

          <Form>

            <Form.Group className="mt-3">
              <UploadWidget avatar={avatar} setAvatar={setAvatar} />
            </Form.Group>

            <Form.Group className="mt-4 mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Tell us a little bit about yourself"
                value={bio}
                // onChange={(e) => setBio(e.target.value)}
                onChange={handleChange}
                maxLength={maxCharacterLimit}
              />
              <div className="character-limit">
                {bio.length}/{maxCharacterLimit} characters remaining
              </div>
            </Form.Group>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" type="submit" size="sm" onClick={handleProfileSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )

};

export default Profile;
