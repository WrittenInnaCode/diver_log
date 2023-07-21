import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const DiveList = ({
  dives,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!dives.length) {
    return <p>There are no dives logged yet... Be the first one to log a dive!</p>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}

      {dives && dives.map((dive) => (

        <Card key={dive._id}
          className="m-3"
        >
          <Card.Body>
            <Card.Title>
              {showUsername ? (
                <>
                  <Link to={`/profiles/${dive.diveAuthor}`} >
                    {dive.diveAuthor} {''}
                  </Link>
                  <span>went diving in</span>
                  <Link to={`/dives/${dive._id}`}>
                    <span> {dive.diveSite} {''} </span>
                    <span>
                      on {dive.createdAt}
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`/dives/${dive._id}`}>
                    {dive.diveSite}
                  </Link>
                  <p style={{ fontSize: '1rem', paddingTop: '0.5rem' }}>{dive.createdAt}</p>
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
    </div>
  );
};

export default DiveList;
