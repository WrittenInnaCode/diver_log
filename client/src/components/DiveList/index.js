import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton'
import AuthModal from '../AuthModal';

import { useAuth } from '../../utils/AuthContext';
import { format } from 'date-fns'

import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

import { MdLocationOn } from 'react-icons/md';
import { FaRegComment } from "react-icons/fa";


const DiveList = ({
  dives,
  title,
  showTitle = true,
  showUsername = true,
  itemsPerPage = 10,
}) => {

  const { user } = useAuth();
  // console.log(user);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  // Pagination. Calculate the index of the first and last dive to display on the current page
  const indexOfLastDive = currentPage * itemsPerPage;
  const indexOfFirstDive = indexOfLastDive - itemsPerPage;
  const currentDives = dives.slice(indexOfFirstDive, indexOfLastDive);

  const totalPages = Math.ceil(dives.length / itemsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  if (!dives.length) {
    return <Alert variant="warning">There are no dives logged yet!</Alert>;
  }

  return (
    <Container className=''>
      {showTitle && <h4 className='pb-3'>{title}</h4>}

      {currentDives.map((dive) => (

        <div key={dive._id} className='pb-5'>

          {showUsername && (
            <div className='pb-2'>
              <Link to={`/profiles/${dive.author?.username}`} className='text-decoration-none link-light fw-bolder'>
                <Image roundedCircle
                  src={dive.author?.avatar}
                  alt={`${dive.author?.username}'s Avatar`}
                  style={{ width: '35px', height: '35px', marginRight: '0.5rem' }}
                />
                {dive.author.username}
              </Link>
            </div>
          )}

          <Card style={{ maxWidth: '35rem' }}>
            <Card.Header className='dive-header'>
              {/* <span>went diving in</span> */}
              <Link to={`/dives/${dive._id}`}
                className='text-primary text-opacity-50 text-decoration-none'>
                <MdLocationOn />
                <span className='fw-bolder pe-1'> {dive.diveSite} {''}</span>
                <span style={{ fontSize: '13px' }}> {format(new Date(dive.diveDate), 'MMMM d, yyyy')}</span>
              </Link>
            </Card.Header>

            <Card.Body className='dive-card'>

              <Carousel interval={null} className='photoSlide'>
                {dive.divePhoto.map((photoUrl, index) => (

                  <Carousel.Item key={index}
                  // style={{ width: "35rem", height: "30rem" }} 
                  >
                    <div className='d-flex justify-content-center'>
                      <Image
                        src={photoUrl}
                        alt={`Dive Photo ${index + 1}`}
                        style={{ width: "35rem", height: "30rem", objectFit: "contain" }}
                      />
                    </div>
                  </Carousel.Item>

                ))}
              </Carousel>

              <Link className="diveText" to={`/dives/${dive._id}`}>
                <Card.Text className='pt-3'>
                  {dive.diveText}
                </Card.Text>
              </Link>

            </Card.Body>

            <Card.Footer className="dive-footer text-muted d-flex justify-content-between">

              <LikeButton
                dive={dive}
                user={user}
                onUnauthorizedLike={() => setShowAuthModal(true)}
              />

              {/* If user is not logged in and tries to like the dive, show auth modal: */}
              <AuthModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />

              <Link to={`/dives/${dive._id}`} className='link-secondary text-decoration-none'> <FaRegComment /> {dive.comments ? dive.comments.length : 0}{' '} comment{dive.comments && dive.comments.length === 1 ? '' : 's'}</Link>
              <span style={{ fontSize: '10px' }}>Posted on {dive.createdAt}</span>
            </Card.Footer>
          </Card>
        </div>
      ))}

      {totalPages > 1 && (
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePaginationClick(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

    </Container>
  );
};

export default DiveList;
