import React from 'react';
import { Link } from 'react-router-dom';

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

          <div key={dive._id} className="card mb-3">

            <h4>
              {showUsername ? (
                <Link
                 
                  to={`/profiles/${dive.diveAuthor}`}
                >
                  {dive.diveAuthor} {''}
                  <span>
                    went diving in {dive.diveSite} {''}
                  </span>
                  <span>
                     on {dive.createdAt}
                  </span>
                </Link>

                
                
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this dive on {dive.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{dive.diveText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/dives/${dive._id}`}
            >
              Join the discussion on this dive.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default DiveList;
