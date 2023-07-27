import React from 'react';
import { format, differenceInMinutes  } from 'date-fns';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import CommentList from '../../components/CommentList';
// import CommentForm from '../../components/CommentForm';

import { QUERY_SINGLE_DIVE } from '../../utils/queries';


const SingleDive = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { diveId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_DIVE, {
        // pass URL parameter
        variables: { diveId: diveId },
    });


    const dive = data?.dive || {};


    const calculateTotalTime = (timeIn, timeOut) => {
        if (!timeIn || !timeOut) {
            return null;
        }
        
        const totalTime = differenceInMinutes(new Date(timeOut), new Date(timeIn));
        return totalTime;
    };


    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div style={{ padding: '1rem' }}>
            <h1 style={{ fontStyle: 'italic', paddingBottom: '1rem' }}>{dive.diveSite}</h1>
            <p> Went diving here on {format(new Date(dive.diveDate), 'MMMM d, yyyy')}.</p>

            <p style={{
                // fontSize: '1.5rem',
                // border: '2px',
                // lineHeight: '1.5',
                paddingBottom: '2rem'
            }} >
                {dive.diveText}
            </p>

            <div style={{ paddingBottom: '1rem' }}>
                <h4>Dive stats:</h4>
                <p>
                    Dive started at {format(new Date(dive.timeIn), 'hh:mm aa')}
                </p>
                <p>
                    Dive ended at {format(new Date(dive.timeOut), 'hh:mm aa')}
                </p>
                <p>Total dive time: {calculateTotalTime(dive.timeIn, dive.timeOut)} minutes</p>
            </div>

            <div style={{ paddingBottom: '1rem' }}>
                <h4>My dive buddy:</h4>
                <p>
                    {dive.diveBuddy}
                </p>
            </div>

            <div style={{ paddingBottom: '1rem' }}>
                <h4>The aquatic life I saw:</h4>
                <p style={{}} >
                    {dive.diveLife}
                </p></div>



            <h3 style={{ fontSize: '1rem', paddingBottom: '2rem' }}>
                {dive.diveAuthor} {''}
                <span> posted on {dive.createdAt} </span>
            </h3>

            <br />

            {/* <Divider horizontal style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                <Header as='h3'> Comments </Header>
            </Divider>

            <div>
                <CommentList comments={dive.comments} />
            </div>

            <br />

            <div style={{ border: '' }}>
                <CommentForm diveId={dive._id} />
            </div> */}

        </div>
    );
};

export default SingleDive;
