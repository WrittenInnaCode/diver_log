import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';

import DiveList from '../../components/DiveList';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { UPDATE_BIO, UPDATE_AVATAR } from '../../utils/mutations';

import Auth from '../../utils/auth';
import { useAuth } from '../../utils/AuthContext';

import AvatarUploadWidget from '../../components/AvatarUploadWidget';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { MdSettings } from 'react-icons/md'; //edit button gear icon


const Profile = () => {

  const { username: userParam } = useParams();
  const navigate = useNavigate();
  const { user: loggedInUser } = useAuth(); // Assume 'user' is the profile being viewed and 'loggedInUser' is the user who is logged in

  const { loading, error, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // Use useMemo to derive 'user' from 'data' only when 'data' changes ("The 'user' logical expression could make the dependencies of useEffect Hook change on every render. To fix this, wrap the initialization of 'user' in its own useMemo() Hook")
  const user = useMemo(() => data?.me || data?.user || {}, [data]);

  const divesWithLikeStatus = useMemo(() => {
    // First, sort the dives based on the diveDate, from newest to oldest (creating a new array)
    const sortedDives = (user.dives || []).slice().sort((a, b) => new Date(b.diveDate) - new Date(a.diveDate)); //The use of .slice() before .sort() is to create a shallow copy of the array, preventing the original user.dives array from being mutated, which is a best practice to avoid unintended side effects in React components

    // Then, map over sorted dives to include the isLikedByCurrentUser property
    return sortedDives.map(dive => ({
      ...dive,
      isLikedByCurrentUser: dive.likes.some(like => like.likedBy._id === loggedInUser?._id)
    }));
  }, [user.dives, loggedInUser?._id]);


  const [show, setShow] = useState(false); //modal
  const [bio, setBio] = useState(user?.userBio || '');
  const [avatar, setAvatar] = useState(null); // Initialize avatar state with user's current avatar or a default avatar

  useEffect(() => {
    // Set avatar state when user data is available
    setAvatar(user.avatar || 'https://res.cloudinary.com/dbudwdvhb/image/upload/v1695971557/avatar/py2dbrno3fq00jzs3kg5.png');
  }, [user.avatar]);


  useEffect(() => {
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
      navigate("/me");
    }
  }, [navigate, userParam]);


  const [updateBio] = useMutation(UPDATE_BIO);
  const [updateAvatar] = useMutation(UPDATE_AVATAR);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // When Edit button is clicked, set `bio` state with the user's existing bio data
    setBio(user?.userBio || '');
    setShow(true);
  };

  const handleProfileSave = async () => {
    try {
      await updateBio({ variables: { userBio: bio } });
      await updateAvatar({ variables: { avatar } });
      handleClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


  const maxCharacterLimit = 80;

  const handleChange = (event) => {
    const text = event.target.value;
    // Ensure the bio doesn't exceed the character limit
    if (text.length <= maxCharacterLimit) {
      setBio(text);
    }
  };

  
  const isProfileOwner = Auth.loggedIn() && Auth.getProfile().data.username === user.username;


  const numDives = (user.dives ?? []).length;


  // Calculate the maximum depth
  let maxDepth = 0; // Initialize maxDepth to 0

  user.dives.forEach((dive) => {
    if (dive.maxDepth > maxDepth) {
      maxDepth = dive.maxDepth; // Update maxDepth if a deeper dive is found
    }
  });


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <Container className='pt-2'>

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
          // dives={sortedDives}
          dives={divesWithLikeStatus}
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
              <AvatarUploadWidget avatar={avatar} setAvatar={setAvatar} />
            </Form.Group>

            <Form.Group className="mt-4 mb-3">
              <Form.Label className='fw-bolder ps-1'>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Tell us a little bit about yourself"
                value={bio}
                onChange={handleChange}
                maxLength={maxCharacterLimit}
              />
              <div className="character-limit">
                {bio.length}/{maxCharacterLimit} characters
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