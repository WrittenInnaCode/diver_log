import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns'
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import Image from 'react-bootstrap/Image';

import { MdLocationOn } from 'react-icons/md';

const DiveList = ({
  dives,
  title,
  showTitle = true,
  showUsername = true,
  itemsPerPage = 10,
}) => {

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
    <Container>
      {showTitle && <h4 className='pb-3'>{title}</h4>}

      {currentDives.map((dive) => (
        <div key={dive._id} className='pb-5'>

          {showUsername ? (
            <>
              {/* viewing ALL dives by all users - shows username above the card */}
              <div className='pb-2'>
                <Link to={`/profiles/${dive.author?.username}`} className='text-decoration-none link-light fw-bolder'>

                  <Image roundedCircle
                    src={dive.author?.avatar}
                    alt={`${dive.author?.username}'s Avatar`}
                    style={{ width: '35px', height: '35px', marginRight: '0.5rem' }} />

                  {dive.author.username} {''}

                </Link>
              </div>
            </>
          ) : (
            <>
              {/* viewing all dives by a specific/single user - does not show the username above the card */}

              {/* <Link to={`/dives/${dive._id}`}>
                <span>{dive.diveSite}</span>
                <span> on {format(new Date(dive.diveDate), 'MMMM d, yyyy')}.</span>
              </Link>
              <p style={{ fontSize: '12px', paddingTop: '0.5rem' }}> Posted on {dive.createdAt}</p> */}
            </>
          )}

          <Card  style={{ width: '35rem' }}>
            <Card.Header className='dive-header'>
              {/* <span>went diving in</span> */}
              <Link to={`/dives/${dive._id}`} 
              className='text-primary text-opacity-50 text-decoration-none'>
                <MdLocationOn />
                <span className='fw-bolder pe-1'> {dive.diveSite} {''}</span>
                <span style={{ fontSize:'13px' }}> {format(new Date(dive.diveDate), 'MMMM d, yyyy')}</span>
              </Link>
            </Card.Header>

            <Card.Body className='dive-card'>
              <Link className="diveText" to={`/dives/${dive._id}`}>
              <Card.Img src="https://media.istockphoto.com/id/133729032/photo/two-people-scuba-diving-with-sunlight-from-above.jpg?s=612x612&w=0&k=20&c=Krb5L_3TaR4pvPEE60w4JlI31yTz3coI_kxokOKrVYE=" />
                <Card.Text >
                  {dive.diveText}
                </Card.Text>
              </Link>
               </Card.Body>

               <Card.Footer className="dive-footer text-muted d-flex justify-content-between" style={{ fontSize: '10px' }}>
                <Link to={`/dives/${dive._id}`} className='link-secondary text-decoration-none'>comments</Link>
                <span>Posted on {dive.createdAt}</span>
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
