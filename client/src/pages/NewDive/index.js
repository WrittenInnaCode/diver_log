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

import MyDatePicker from '../../components/DatePicker';
import MyTimePicker from '../../components/TimePicker';
import { differenceInMinutes } from 'date-fns';


const NewDive = () => {

	const [formData, setFormData] = useState({
		diveSite: '',
		diveDate: null, // Initialize diveDate as null
		timeIn: null,
		timeOut: null,
		diveText: '',
		diveBuddy: '',
		diveLife: '',
	});

	const [errorMessage, setErrorMessage] = useState('');


	const [addDive, { error }] = useMutation(ADD_DIVE, {
		update(cache, { data: { addDive } }) {
			try {
				const { dives } = cache.readQuery({ query: QUERY_DIVES });

				cache.writeQuery({
					query: QUERY_DIVES,
					data: { dives: [addDive, ...dives] },
				});
			} catch (e) {
				console.error(e);
			}

			// update me object's cache
			const { me } = cache.readQuery({ query: QUERY_ME });
			cache.writeQuery({
				query: QUERY_ME,
				data: { me: { ...me, dives: [...me.dives, addDive] } },
			});
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



	const handleFormSubmit = async (event) => {
		event.preventDefault();


		// Check if diveDate is null or empty
		if (!formData.diveDate || !formData.timeIn || !formData.timeOut) {
			setErrorMessage("Please select the date and time before submitting the form.");
			return; // Exit the function to prevent form submission
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
			const { diveSite, diveDate, timeIn, timeOut, diveText, diveBuddy, diveLife } = formData; // Destructure the variables from formData
			const { data } = await addDive({
				variables: {
					diveSite,
					diveDate,
					timeIn,
					timeOut,
					diveText,
					diveBuddy,
					diveLife,

					diveAuthor: Auth.getProfile().data.username,
				},
			});

			console.log('Newly created dive:', data);

			if (data && data.addDive && data.addDive._id) {

				// After successful submission, navigate the user to the new dive post
				navigate(`/dives/${data.addDive._id}`);

				setFormData({
					diveSite: '',
					diveDate: null, // Use null to reset the date picker
					timeIn: null,
					timeOut: null,
					diveText: '',
					diveBuddy: '',
					diveLife: '',
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
	};


	const handleTimeInChange = (time) => {
		setFormData((prevData) => ({
			...prevData,
			timeIn: time,
		}));
	};

	const handleTimeOutChange = (time) => {
		setFormData((prevData) => ({
			...prevData,
			timeOut: time,
		}));
	};

	const calculateTotaDivelTime = (timeIn, timeOut) => {
        if (!timeIn || !timeOut) {
          return null; // If either timeIn or timeOut is not set, return null indicating invalid input
        }
    
        const totalDiveTime = differenceInMinutes(timeOut, timeIn);
        return totalDiveTime;
      };
	  

	return (
		<div>
			<h2>
				Log your new dive
			</h2>


			{Auth.loggedIn() ? (
				<>
					<Container>
						<Form onSubmit={handleFormSubmit} className='diveForm'>

							<div>

								<MyDatePicker
									diveDate={formData.diveDate}
									handleDateChange={handleDateChange}
								/>
								{/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}

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

								{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
							</div>

							<Form.Group className="mb-3" >
								<Form.Label>Dive Site</Form.Label>
								<Form.Control
									// required
									type="text"
									placeholder="Enter the Dive Site name or location"
									value={formData.diveSite}
									name="diveSite"
									onChange={handleChange} />
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Dive Buddies</Form.Label>
								<Form.Control
									type="text"
									placeholder="Add people you've dived with"
									value={formData.diveBuddy}
									name="diveBuddy"
									onChange={handleChange} />
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Marine Life</Form.Label>
								<Form.Control
									type="text"
									placeholder="Add marine life you encountered during this dive"
									value={formData.diveLife}
									name="diveLife"
									onChange={handleChange} />
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Dive description</Form.Label>
								<Form.Control
									as="textarea"
									placeholder='Write about your experience while taking this dive'
									rows={3}
									value={formData.diveText}
									name="diveText"
									onChange={handleChange} />
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>

						</Form>
					</Container>


					{error && (
						<p>
							{error.message}
						</p>
					)}

				</>

			) : (
				<p>
					You need to be logged in to log a new dive.
				</p>
			)}

		</div>

	);
};

export default NewDive;