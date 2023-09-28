import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns'
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import Image from 'react-bootstrap/Image';

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
      {showTitle && <h4>{title}</h4>}

      {currentDives.map((dive) => (

        <Card key={dive._id} className="m-3">
          <Card.Body className='diveCard'>
            <Card.Title>
              {showUsername ? (
                <>
                  {/* viewing ALL dives by all users */}
                  <Link to={`/profiles/${dive.author?.username}`} >

                    <Image roundedCircle
                      src={dive.author?.avatar}
                      alt={`${dive.author?.username}'s Avatar`}
                      style={{ width: '35px', height: '35px', marginRight: '0.5rem' }} />

                    {dive.author.username} {''}

                  </Link>
                  <span>went diving in</span>
                  <Link to={`/dives/${dive._id}`}>
                    <span> {dive.diveSite} {''}</span>
                    <span> on {format(new Date(dive.diveDate), 'MMMM d, yyyy')}.</span>
                  </Link>

                  <p style={{ fontSize: '15px' }}>
                    Posted on {dive.createdAt}
                  </p>

                </>
              ) : (
                <>
                  {/* viewing all dives by a specific/single user */}
                  <Link to={`/dives/${dive._id}`}>
                    <span>{dive.diveSite}</span>
                    <span> on {format(new Date(dive.diveDate), 'MMMM d, yyyy')}.</span>
                  </Link>
                  <p style={{ fontSize: '12px', paddingTop: '0.5rem' }}> Posted on {dive.createdAt}</p>
                </>
              )}

            </Card.Title>

            <Link className="diveText" to={`/dives/${dive._id}`}>
              <Card.Text >
                {dive.diveText}
              </Card.Text>
            </Link>

          </Card.Body>

        </Card>
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
