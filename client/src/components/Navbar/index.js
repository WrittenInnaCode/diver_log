import { NavLink, useLocation } from 'react-router-dom';

import React, { useState } from 'react';

import AuthModal from '../AuthModal';

import Auth from '../../utils/auth';

import { Navbar, Nav, Container, Button } from 'react-bootstrap';


function AppNavbar() {

	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	// Modal:
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);


	// to assign custom class to navlinks when they're selected
	//assigning location variable
	const location = useLocation();

	//destructuring pathname from location
	const { pathname } = location;

	//Javascript split method to get the name of the path in array
	const splitLocation = pathname.split("/");


	return (
		<Container>
			<Navbar expand="sm">
				<Nav className="d-flex flex-row flex-sm-column justify-content-center w-100">
					<Container className='p-2'>
						<Navbar.Brand as={NavLink} to="/"
							// className='logo text-light p-2'
							className={splitLocation[1] === "me" ? "logo  fw-normal p-2" : "logo fw-normal p-2"}
						>Divegram</Navbar.Brand>
					</Container>

					{Auth.loggedIn() ? (
						<>
							<div className='toggleBttn'>
								<Container className='d-flex flex-column'>
									<Navbar.Toggle aria-controls="basic-navbar-nav" />

									<Navbar.Collapse id="basic-navbar-nav" >
										<Nav className="me-auto d-flex flex-column">
											<Nav.Item>
												<Nav.Link as={NavLink} to="/me" eventKey="/me"
													className={splitLocation[1] === "me" ? " fw-bold" : ""}>
													{Auth.getProfile().data.username} {' '}
												</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link as={NavLink} to="/newdivelog" eventKey="/newdivelog"
													className={splitLocation[1] === "newdivelog" ? " fw-bold" : ""}
												>Log New Dive</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link as={NavLink} to="/dives" eventKey="/dives"
													className={splitLocation[1] === "dives" ? "t fw-bold" : ""}
												>Explore Dives</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link as={NavLink} to="/bucketlist" eventKey="/bucketlist"
													className={splitLocation[1] === "bucketlist" ? " fw-bold" : ""}
												>Bucket List</Nav.Link>
											</Nav.Item>

											<Button variant="warning" onClick={logout} size="sm" className='logOutBttn'> Ascend and Exit </Button>
										</Nav>
									</Navbar.Collapse>
								</Container>
							</div>
						</>
					) : (
						<>
							<Button className="loginBttn" variant="primary" size="sm" onClick={() => handleShow()}>
								Dive In
							</Button>
						</>
					)}

				</Nav>

			</Navbar>

			<AuthModal show={show} onHide={handleClose} />

		</Container>
	);
}

export default AppNavbar;