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
    return <p>No dives yet...</p>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}

      {dives && dives.map((dive) => (

        <Card key={dive._id}
          className="m-3"
        >
          <Card.Body>
            {showUsername ? (
              <Card.Title>
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
              </Card.Title>


            ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this dive on {dive.createdAt}
                  </span>
                </>
              )}

             <Card.Text
              //  className="card-body bg-light p-2"
             >{dive.diveText}</Card.Text>
          </Card.Body>

        </Card>
      ))}
    </div>
  );
};

export default DiveList;
