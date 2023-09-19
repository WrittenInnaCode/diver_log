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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
        <Container className="p-4" key={dive._id}>

            <Container className='diveDetails pt-3'>

                {isAuthor && (
                    <div className='d-flex justify-content-end pb-2'>
                        <Button variant="warning" size="sm">EDIT</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(dive._id)}>DELETE</Button>
                    </div>
                )}

                <Row className="formBorders m-1 pb-1">
                    <Col>
                        <div 
                        // className="formBorders m-1 pb-1"
                        >
                            <h1 className='text-primary text-opacity-50'>{dive.diveSite}</h1>
                            <div className='diveStats'>
                                <h6 className='text-primary text-opacity-50'>DIVE DATE:</h6>
                                <p>{format(new Date(dive.diveDate), 'MMMM d, yyyy')}</p>
                            </div>
                        </div>
                    </Col>

                    <Col className='star-rating'>
                    </Col>
                </Row>


                <div className="formBorders m-1 my-4 pb-1">
                    {/* <h6 className='text-primary text-opacity-50'>DIVE STATS</h6> */}

                    <Row className='diveStatsFlex pb-1'>
                        <Col className='diveStats pe-2'>
                            <h6 className='text-primary text-opacity-50'>TIME:</h6>
                            <div>
                                <span>
                                    Dive started at {format(new Date(dive.timeIn), 'h:mm aa')}
                                    <br />
                                    Dive ended at {format(new Date(dive.timeOut), 'h:mm aa')}
                                </span>
                                <p className='border-top border-primary border-opacity-50'>Total dive time: {calculateTotalTime(dive.timeIn, dive.timeOut)} min</p>
                            </div>
                        </Col>

                        <Col className='diveStats ps-2'>
                            <h6 className='text-primary text-opacity-50'>TANK PRESSURE:</h6>
                            <p>
                                Start:  {dive.startPsi} PSI
                                {/* </p>
                            <p> */}
                                <br />
                                End: {dive.endPsi} PSI
                            </p>
                        </Col>
                    </Row>


                    <Row className='diveStatsFlex pb-1'>
                        <Col>
                            <div className='diveStats'>
                                <h6 className='text-primary text-opacity-50'>WATER TEMPERATURE:</h6>
                                <p>{dive.temperature} °F </p>
                            </div>

                            <div className='diveStats'>
                                <h6 className='text-primary text-opacity-50'>VISIBILITY:</h6>
                                <p>{dive.visibility} FT </p>
                            </div>

                            <div className='diveStats'>
                                <h6 className='text-primary text-opacity-50'>CURRENT:</h6>
                                <p>{dive.current} </p>
                            </div>
                        </Col>


                        <Col>
                            <div className='diveStats'>
                                <h6 className='text-primary text-opacity-50'>MAX DEPTH:</h6>
                                <p>{dive.maxDepth} FT </p>
                            </div>

                            <div className='diveStats'>
                                <h6 className='text-primary text-opacity-50'>WEIGHTS:</h6>
                                <p>{dive.weights} LB </p>
                            </div>
                        </Col>

                    </Row>




                    <div className='diveStats'>
                        <h6 className='text-primary text-opacity-50'>MY DIVE BUDDY:</h6>
                        <p>{dive.diveBuddy} </p>
                    </div>

                    <div className='diveStatsAquatic'>
                        <h6 className='aquaticLife text-primary text-opacity-50'>AQUATIC LIFE ENCOUNTERED:</h6>
                        <p>{dive.diveLife}</p>
                    </div>
                </div>

                <p className="formBorders diveDescription my-4"> {dive.diveText}</p>

                <div className='d-flex justify-content-end'>
                    <p className="text-primary text-opacity-50">
                        {dive.diveAuthor} {''}
                        <span> posted on {dive.createdAt} </span>
                    </p>
                </div>



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
            </Container>
        </Container>
    );
};

export default SingleDive;
