import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_DIVE } from '../../utils/mutations';
import { QUERY_DIVES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import MyDatePicker from '../../components/DatePicker';

const NewDive = () => {

	// const [diveSite, setDiveSite] = useState('');
	// const [diveText, setDiveText] = useState('');
	// const [diveBuddy, setDiveBuddy] = useState('');
	// const [diveLife, setDiveLife] = useState('');

	const [formData, setFormData] = useState({
		diveSite: '',
		diveDate: '',
		diveText: '',
		diveBuddy: '',
		diveLife: '',
	});


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


	// const handleFormSubmit = async (event) => {
	// 	event.preventDefault();

	// 	try {
	// 		// if (edit) {
	// 		// 	const { data } = await edit({
	// 		// 		variables: {
	// 		// 			diveId,
	// 		// 			diveSite,
	// 		// 			diveText,
	// 		// 			diveBuddy,
	// 		// 			diveLife

	// 		// 		},
	// 		// 	});
	// 		// 	window.location.assign('/me');

	// 		// } else {
	// 			const { data } = await addDive({
	// 				variables: {
	// 					diveSite,
	// 					diveText,
	// 					diveBuddy,
	// 					diveLife,

	// 					diveAuthor: Auth.getProfile().data.username,
	// 				},
	// 			});

	// 			setDiveSite('');
	// 			setDiveText('');
	// 			setDiveBuddy('');
	// 			setDiveLife('');
	// 		// }

	// 	} catch (err) {
	// 		console.error(err);
	// 	};
	// };

	const handleFormSubmit = async (event) => {
		event.preventDefault();

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
			const { diveSite, diveDate, diveText, diveBuddy, diveLife } = formData; // Destructure the variables from formData
			const { name, value } = await addDive({
				variables: {
					diveSite,
					diveDate,
					diveText,
					diveBuddy,
					diveLife,

					diveAuthor: Auth.getProfile().data.username,
				},
			});

			setFormData({
				diveSite: '',
				diveDate: '',
				diveText: '',
				diveBuddy: '',
				diveLife: '',
			});

			// }

		} catch (err) {
			console.error(err);
		};
	};


	// const handleChange = (event) => {
	// 	const { name, value } = event.target;

	// 	if (name === 'diveSite') {
	// 		setDiveSite(value);
	// 	} else if (name === 'diveText') {
	// 		setDiveText(value);
	// 	} else if (name === 'diveBuddy') {
	// 		setDiveBuddy(value);
	// 	} else if (name === 'diveLife') {
	// 		setDiveLife(value);
	// 	};
	// };

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
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

							<MyDatePicker />

							<Form.Group className="mb-3" >
								<Form.Label>Dive Site</Form.Label>
								<Form.Control
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