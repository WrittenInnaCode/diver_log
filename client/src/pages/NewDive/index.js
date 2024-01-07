import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_DIVE } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_DIVES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import StarRating from '../../components/StarRating';
import MyDatePicker from '../../components/DatePicker';
import MyTimePicker from '../../components/TimePicker';
import { differenceInMinutes } from 'date-fns';
import PhotoUploadWidget from '../../components/PhotoUploadWidget';

import { GrClose } from 'react-icons/gr';


const NewDive = ({ edit, formData, diveId, editDive }) => {

	const [state, setState] = useState({
		diveSite: '',
		diveDate: null, // Initialize diveDate as null
		timeIn: null,
		timeOut: null,
		startPsi: '',
		endPsi: '',
		diveText: '',
		diveBuddy: '',
		diveLife: '',
		temperature: '',
		visibility: '',
		current: '',
		maxDepth: '',
		weights: '',
		rating: null,
		divePhoto: [],
	});

	const [errorMessage, setErrorMessage] = useState('');
	const [ratingError, setRatingError] = useState('');


	useEffect(() => {
		if (formData) {
			// Pre-fill form fields with formData
			setState({
				diveSite: formData.diveSite || '',
				diveDate: formData.diveDate || null,
				timeIn: formData.timeIn || null,
				timeOut: formData.timeOut || null,
				startPsi: formData.startPsi || '',
				endPsi: formData.endPsi || '',
				diveText: formData.diveText || '',
				diveBuddy: formData.diveBuddy || '',
				diveLife: formData.diveLife || '',
				temperature: formData.temperature || '',
				visibility: formData.visibility || '',
				current: formData.current || '',
				maxDepth: formData.maxDepth || '',
				weights: formData.weights || '',
				rating: formData.rating || null,
				divePhoto: formData.divePhoto || [],
			});
		}
	}, [formData]);


	const [addDive, { error }] = useMutation(ADD_DIVE, {
		update(cache, { data: { addDive } }) {
			try {
				const { dives } = cache.readQuery({ query: QUERY_DIVES }) || { dives: [] };

				cache.writeQuery({
					query: QUERY_DIVES,
					data: { dives: [addDive, ...dives] },
				});
			} catch (e) {
				console.error(e);
			}

			// update me object's cache
			const { me } = cache.readQuery({ query: QUERY_ME }) || { me: null };
			if (me) {
				cache.writeQuery({
					query: QUERY_ME,
					data: { me: { ...me, dives: [...me.dives, addDive] } },
				});
			}
		},
	});



	const navigate = useNavigate();


	// Fetch the user data from the cache
	const { data: userData, loading: userLoading } = useQuery(QUERY_ME);

	if (userLoading) {
		// Show a loading state while the data is being fetched
		return <div>Loading...</div>;
	}

	// Destructure the user data, providing a default value if it's null
	const { me } = userData || { me: null };



	const handlePhotoUpload = (photos) => {
		// console.log('Photo URL:', photoUrl);
		setState((prevState) => ({
			...prevState,
			divePhoto: [...prevState.divePhoto, ...photos]
		}));
	};


	// ---------------------------------form submit--------------------------------- //
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// Check if these fields are null or empty
		if (!state.diveDate || !state.timeIn || !state.timeOut) {
			setErrorMessage("Please select the date and time before submitting the form.");
			return; // Exit the function to prevent form submission
		}

		if (state.rating === null) {
			setRatingError('Please provide a rating for the dive.');
			return;
		}

		if (state.timeOut < state.timeIn) {
			setErrorMessage("Are you sure you ended the dive before it started?");
			return;
		}


		let data; // Declare data variable here


		try {
			if (edit) {
				// Handle edit operation
				data = await editDive({
					variables: {
						diveId,
						diveSite: state.diveSite,
						diveDate: state.diveDate,
						timeIn: state.timeIn,
						timeOut: state.timeOut,
						startPsi: state.startPsi,
						endPsi: state.endPsi,
						diveText: state.diveText,
						diveBuddy: state.diveBuddy,
						diveLife: state.diveLife,
						divePhoto: state.divePhoto,
						temperature: state.temperature,
						visibility: state.visibility,
						current: state.current,
						maxDepth: state.maxDepth,
						weights: state.weights,
						rating: state.rating,
						diveAuthor: Auth.getProfile().data.username,

					},
				});
				window.location.assign(`/dives/${diveId}`);

			} else {
				// Handle add operation
				const {
					diveSite,
					diveDate,
					timeIn,
					timeOut,
					startPsi,
					endPsi,
					diveText,
					diveBuddy,
					diveLife,
					temperature,
					visibility,
					current,
					maxDepth,
					weights,
					rating,
					divePhoto
				} = state; // Destructure the variables from state

				const { data } = await addDive({
					variables: {
						diveSite,
						diveDate,
						timeIn,
						timeOut,
						startPsi,
						endPsi,
						diveText,
						diveBuddy,
						diveLife,
						divePhoto,
						temperature,
						visibility,
						current,
						maxDepth,
						weights,
						rating,
						diveAuthor: Auth.getProfile().data.username,
					},
				});

				// console.log('Newly created dive:', data);

				 if (data && data.addDive && data.addDive._id) {

			// After successful submission, navigate the user to the new dive post
				navigate(`/dives/${data.addDive._id}`);

				setState({
					diveSite: '',
					diveDate: null, // Use null to reset the date picker
					timeIn: null,
					timeOut: null,
					startPsi: '',
					endPsi: '',
					diveText: '',
					diveBuddy: '',
					diveLife: '',
					divePhoto: [],
					temperature: '',
					visibility: '',
					current: '',
					maxDepth: '',
					weights: '',
					rating: null,
				});

			} else {
				throw new Error('Failed to create dive post.');
			}
			}
		} catch (err) {
			console.error(err);
		}
	};



	// Handle form field changes
	const handleChange = (event) => {
		const { name, value } = event.target;
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};


	// Callback function to handle date change
	const handleDateChange = (date) => {
		setState((prevState) => ({
			...prevState,
			diveDate: date,
		}));
		setErrorMessage('');
	};


	const handleTimeInChange = (time) => {
		setState((prevState) => ({
			...prevState,
			timeIn: time,
		}));
		setErrorMessage('');
	};

	const handleTimeOutChange = (time) => {
		setState((prevState) => ({
			...prevState,
			timeOut: time,
		}));
		setErrorMessage('');
	};


	const handleRatingChange = (newRating) => {
		setState((prevState) => ({
			...prevState,
			rating: newRating,
		}));
		setRatingError(''); // Clear the rating error when the user selects a rating
	};


	const calculateTotalDiveTime = (timeIn, timeOut) => {
		if (!timeIn || !timeOut) {
			return null; // If either timeIn or timeOut is not set, return null indicating invalid input
		}

		const totalDiveTime = differenceInMinutes(new Date(timeOut), new Date(timeIn));
		return totalDiveTime;
	};


	const handleDeletePhoto = (indexToDelete) => {
		const updatedPhotos = [...state.divePhoto];
		updatedPhotos.splice(indexToDelete, 1); // Remove the photo at the specified index
		setState((prevState) => ({
			...prevState,
			divePhoto: updatedPhotos
		}));
	};



	return (
		<Container>
			<h2 className='p-2 mt-2 text-light text-opacity-75'>
				{edit ? 'Edit Dive' : 'Add a New Dive'}
			</h2>

			{Auth.loggedIn() ? (
				<>
					<Alert variant="primary" className='my-4 m-4 text-center'>Note that the system of measurement is Imperial.</Alert>
					<Container className='pb-4'>

						<Form onSubmit={handleFormSubmit} className='diveForm'>

							<div className="formBorders my-4">
								<Row>
									<Col>
										<h6 className='text-primary text-opacity-50'>DIVE SITE</h6>
										<Form.Group className="mb-3">
											<Form.Control
												required
												type="text"
												placeholder="Enter the Dive Site name or location"
												value={state.diveSite}
												name="diveSite"
												onChange={handleChange} />
										</Form.Group>
									</Col>

									<Col className='starRating text-center'>
										<h6 className='text-primary text-opacity-50'>DIVE RATING</h6>
										<StarRating
											value={state.rating}
											onChange={handleRatingChange}
										/>
										{ratingError && <p style={{ color: 'red' }}>{ratingError}</p>}

									</Col>
								</Row>
							</div>

							<div className="formBorders my-4">
								<h6 className='text-primary text-opacity-50'>DATE & TIME</h6>
								<div className="d-flex justify-content-evenly mb-3">
									<MyDatePicker
										diveDate={state.diveDate}
										handleDateChange={handleDateChange}
									/>

									<MyTimePicker
										type="in"
										selectedTime={state.timeIn}
										handleTimeChange={handleTimeInChange}
									/>
									<MyTimePicker
										type="out"
										selectedTime={state.timeOut}
										handleTimeChange={handleTimeOutChange}
									/>
								</div>
								{errorMessage && <p style={{ color: 'red' }} className='text-center'>{errorMessage}</p>}
							</div>



							<div className="formBorders my-4">
								<h6 className='text-primary text-opacity-50'>DIVE BUDDIES</h6>
								<Form.Group className="mb-3">
									<Form.Control
										type="text"
										placeholder="Add people you've dived with"
										value={state.diveBuddy}
										name="diveBuddy"
										onChange={handleChange} />
								</Form.Group>
							</div>


							<div className="formBorders ">
								<h6 className='text-primary text-opacity-50'>TANK PRESSURE</h6>
								<div className="d-flex justify-content-evenly">
									<Form.Group className="mb-3" >
										<Form.Label>Start Pressure</Form.Label>
										<Form.Control
											required
											type="text"
											placeholder="PSI"
											value={state.startPsi}
											name="startPsi"
											onChange={handleChange} />
									</Form.Group>

									<Form.Group className="mb-3" >
										<Form.Label>End Pressure</Form.Label>
										<Form.Control
											required
											type="text"
											placeholder="PSI"
											value={state.endPsi}
											name="endPsi"
											onChange={handleChange} />
									</Form.Group>
								</div>
							</div>


							<div className='formBorders my-4'>
								<h6 className='text-primary text-opacity-50'>WATER CONDITIONS</h6>
								<div className="d-flex justify-content-evenly">
									<div>
										<Form.Group className="mb-3" >
											<Form.Label>Temperature</Form.Label>
											<Form.Control
												type="text"
												placeholder="°F"
												value={state.temperature}
												name="temperature"
												onChange={handleChange} />
										</Form.Group>

										<Form.Group className="mb-3" >
											<Form.Label>Visibility</Form.Label>
											<Form.Control
												type="text"
												placeholder="FT"
												value={state.visibility}
												name="visibility"
												onChange={handleChange} />
										</Form.Group>


										<Form.Group className="mb-3" >
											<Form.Label>Weights</Form.Label>
											<Form.Control
												type="text"
												placeholder="LB"
												value={state.weights}
												name="weights"
												onChange={handleChange} />
										</Form.Group>

									</div>

									<div>
										<Form.Group className="mb-3" >
											<Form.Label>Max Depth</Form.Label>
											<Form.Control
												type="text"
												placeholder="FT"
												value={state.maxDepth}
												name="maxDepth"
												onChange={handleChange} />
										</Form.Group>

										<Form.Group className="mb-3" >
											<Form.Label>Current</Form.Label>
											<Form.Control
												type="text"
												// placeholder=" "
												value={state.current}
												name="current"
												onChange={handleChange} />
										</Form.Group>
									</div>
								</div>
							</div>


							<div className='formBorders my-4'>
								<h6 className='text-primary text-opacity-50'>MARINE LIFE</h6>
								<Form.Group className="mb-3">
									<Form.Control
										type="text"
										placeholder="Add marine life you encountered during this dive"
										value={state.diveLife}
										name="diveLife"
										onChange={handleChange} />
								</Form.Group>
							</div>


							<div className='formBorders my-4'>
								<h6 className='text-primary text-opacity-50'>DIVE DESCRIPTION</h6>
								<Form.Group className="mb-3">
									<Form.Control
										as="textarea"
										placeholder='Write about your experience while taking this dive'
										rows={3}
										value={state.diveText}
										name="diveText"
										onChange={handleChange} />
								</Form.Group>
							</div>

							<div className='formBorders my-4'>
								<h6 className='text-primary text-opacity-50'>DIVE PHOTOS</h6>

								<PhotoUploadWidget onPhotoUpload={handlePhotoUpload} />

								<div className='d-flex flex-wrap mt-3'>
									{state.divePhoto.map((photo, index) => (
										<div key={index} alt={`Dive Photo ${index + 1}`} className='position-relative m-1'>
											<Image thumbnail
												src={photo}
												className="uploaded-photo"
												style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
											/>
											<Button
												aria-label="delete"
												variant="light"
												size="sm"
												className='position-absolute top-0 end-0'
												onClick={() => handleDeletePhoto(index)}>
												<GrClose />
											</Button>
										</div>

									))}
								</div>

							</div>


							<Button variant="primary" type="submit">
								{edit ? "Save Changes" : "Submit"}
							</Button>

						</Form>
					</Container>


					{error && (
						<Alert variant="danger">
							{error.message}
						</Alert>
					)}

				</>

			) : (
				<Alert variant="danger">
					You need to be logged in to log a new dive.
				</Alert>
			)}

		</Container>

	);
};

export default NewDive;