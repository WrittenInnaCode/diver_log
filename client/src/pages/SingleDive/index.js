import React from 'react';
import { format, differenceInMinutes } from 'date-fns';

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

// import CommentList from '../../components/CommentList';
// import CommentForm from '../../components/CommentForm';

import { QUERY_SINGLE_DIVE } from '../../utils/queries';
import { REMOVE_DIVE } from '../../utils/mutations';

import Auth from '../../utils/auth';

import Button from 'react-bootstrap/Button';


const SingleDive = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { diveId } = useParams();

    const { loading, data, error } = useQuery(QUERY_SINGLE_DIVE, {
        // pass URL parameter
        variables: { diveId: diveId },
    });

    const [removeDive] = useMutation(REMOVE_DIVE);
    // const navigate = useNavigate();

    const dive = data?.dive || {};

    const calculateTotalTime = (timeIn, timeOut) => {
        if (!timeIn || !timeOut) {
            return null;
        }
        const totalTime = differenceInMinutes(new Date(timeOut), new Date(timeIn));
        return totalTime;
    };


    // Check if the currently logged-in user is the author of the dive
    const isAuthor = Auth.loggedIn() && Auth.getProfile().data.username === dive.diveAuthor;


    const handleDelete = async (diveId) => {
        const confirmed = window.confirm('Are you sure you want to delete this dive?');
        if (confirmed) {
            try {
                // console.log('Deleting dive with ID:', diveId);
                const { data } = await removeDive({
                    variables: { diveId },
                });
                // Check if the dive was successfully deleted
                if (data && data.removeDive) {
                    // navigate('/me');
                    window.location.assign('/me'); // to refresh the page and fetch the updated data from the server (so that deleted dive does not appear in the list after its deletion)
                } else {
                    console.error('Failed to delete dive');
                }

            } catch (error) {
                // Handle any errors that occur during the deletion process
                console.error('Error deleting dive:', error);
            }
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        // If an error occurred while fetching the dive data
        console.error('Error fetching dive:', error);
        return <div>Error loading dive data</div>;
    }

    return (
        <section className="dive-details" style={{ padding: '2rem' }} key={dive._id}>
            <div class="d-flex justify-content-between">
                <h1 style={{ fontStyle: 'italic', paddingBottom: '1rem' }}>{dive.diveSite}</h1>

                {isAuthor && (
                    <div>
                        <Button variant="outline-warning" size="sm">EDIT</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(dive._id)}>DELETE</Button>
                    </div>
                )}
            </div>
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

        </section>
    );
};

export default SingleDive;
