import React, { useState } from 'react';
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


const NewDive = () => {

	const [formData, setFormData] = useState({
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
		setFormData({ ...formData, divePhoto: [...formData.divePhoto, ...photos] });
	};


	// ---------------------------------form submit--------------------------------- //
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// Check if these fields are null or empty
		if (!formData.diveDate || !formData.timeIn || !formData.timeOut) {
			setErrorMessage("Please select the date and time before submitting the form.");
			return; // Exit the function to prevent form submission
		}

		if (formData.rating === null) {
			setRatingError('Please provide a rating for the dive.');
			return;
		}

		if (formData.timeOut < formData.timeIn) {
			setErrorMessage("Are you sure you ended the dive before it started?");
			return;
		}



		try {
			// if (edit) {
			// 	const { data } = await edit({
			// 		variables: {
			// 			diveId,
			// 			diveSite,
			// 			diveText,
			// 			diveBuddy,
			// 			diveLife

			// 		},
			// 	});
			// 	window.location.assign('/me');

			// } else {
			const { diveSite, diveDate, timeIn, timeOut, startPsi, endPsi, diveText, diveBuddy, diveLife, temperature, visibility, current, maxDepth, weights, rating, divePhoto } = formData; // Destructure the variables from formData
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
					// author: Auth.getProfile().data.username,
					diveAuthor: Auth.getProfile().data.username,
				},
			});

			// console.log('Newly created dive:', data);

			if (data && data.addDive && data.addDive._id) {

				// After successful submission, navigate the user to the new dive post
				navigate(`/dives/${data.addDive._id}`);

				setFormData({
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

				// }
			} else {
				throw new Error('Failed to create dive post.');
			}
		} catch (err) {
			console.error(err);
		};
	};



	// Handle form field changes
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};


	// Callback function to handle date change
	const handleDateChange = (date) => {
		setFormData((prevData) => ({
			...prevData,
			diveDate: date,
		}));
		setErrorMessage('');
	};


	const handleTimeInChange = (time) => {
		setFormData((prevData) => ({
			...prevData,
			timeIn: time,
		}));
		setErrorMessage('');
	};

	const handleTimeOutChange = (time) => {
		setFormData((prevData) => ({
			...prevData,
			timeOut: time,
		}));
		setErrorMessage('');
	};


	const calculateTotalDiveTime = (timeIn, timeOut) => {
		if (!timeIn || !timeOut) {
			return null; // If either timeIn or timeOut is not set, return null indicating invalid input
		}

		const totalDiveTime = differenceInMinutes(timeOut, timeIn);
		return totalDiveTime;
	};


	return (
		<Container>
			<h2 className='p-2 mt-2 text-light text-opacity-75'>
				Add dive log
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
												value={formData.diveSite}
												name="diveSite"
												onChange={handleChange} />
										</Form.Group>
									</Col>

									<Col className='starRating text-center'>
										<h6 className='text-primary text-opacity-50'>DIVE RATING</h6>
										<StarRating
											value={formData.rating}
											onChange={(newRating) => {
												setFormData({ ...formData, rating: newRating });
												setRatingError(''); // Clear the rating error when the user selects a rating
											}} />
										{ratingError && <p style={{ color: 'red' }}>{ratingError}</p>}

									</Col>
								</Row>

							</div>

							<div className="formBorders my-4">
								<h6 className='text-primary text-opacity-50'>DATE & TIME</h6>
								<div className="d-flex justify-content-evenly mb-3">
									<MyDatePicker
										diveDate={formData.diveDate}
										handleDateChange={handleDateChange}
									/>

									<MyTimePicker
										type="in"
										selectedTime={formData.timeIn}
										handleTimeChange={handleTimeInChange}
									/>
									<MyTimePicker
										type="out"
										selectedTime={formData.timeOut}
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
										value={formData.diveBuddy}
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
											value={formData.startPsi}
											name="startPsi"
											onChange={handleChange} />
									</Form.Group>

									<Form.Group className="mb-3" >
										<Form.Label>End Pressure</Form.Label>
										<Form.Control
											required
											type="text"
											placeholder="PSI"
											value={formData.endPsi}
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
												value={formData.temperature}
												name="temperature"
												onChange={handleChange} />
										</Form.Group>

										<Form.Group className="mb-3" >
											<Form.Label>Visibility</Form.Label>
											<Form.Control
												type="text"
												placeholder="FT"
												value={formData.visibility}
												name="visibility"
												onChange={handleChange} />
										</Form.Group>


										<Form.Group className="mb-3" >
											<Form.Label>Weights</Form.Label>
											<Form.Control
												type="text"
												placeholder="LB"
												value={formData.weights}
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
												value={formData.maxDepth}
												name="maxDepth"
												onChange={handleChange} />
										</Form.Group>

										<Form.Group className="mb-3" >
											<Form.Label>Current</Form.Label>
											<Form.Control
												type="text"
												// placeholder=" "
												value={formData.current}
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
										value={formData.diveLife}
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
										value={formData.diveText}
										name="diveText"
										onChange={handleChange} />
								</Form.Group>
							</div>

							<div className='formBorders my-4'>
								<h6 className='text-primary text-opacity-50'>DIVE PHOTOS</h6>

								<PhotoUploadWidget onPhotoUpload={handlePhotoUpload} />

								{formData.divePhoto.map((photo, index) => (
									<Image thumbnail
										key={index}
										src={photo}
										alt={`Dive Photo ${index + 1}`}
										className="uploaded-photo mt-3"
										style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
									/>
								))}
							</div>


							<Button variant="primary" type="submit">
								Submit
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