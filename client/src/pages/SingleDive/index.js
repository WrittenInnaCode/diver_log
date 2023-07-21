import React from 'react';

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

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div >
            <h1 style={{ fontStyle: 'italic' }}>{dive.diveSite}</h1>


            <p style={{
                // fontSize: '1.5rem',
                // border: '2px',
                // lineHeight: '1.5',
            }} >
                {dive.diveText}
            </p>

            <p style={{
                // fontSize: '1.5rem',
                // border: '2px',
                // lineHeight: '1.5',
            }} >
                {dive.diveBuddy}
            </p>

            <p style={{
                // fontSize: '1.5rem',
                // border: '2px',
                // lineHeight: '1.5',
            }} >
                {dive.diveLife}
            </p>


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
