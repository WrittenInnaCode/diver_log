import { NavLink, useLocation } from 'react-router-dom';

import React, { useState } from 'react';

import AuthModal from '../AuthModal';

import Auth from '../../utils/auth';

import { Navbar, Nav, Button } from 'react-bootstrap';


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
		<div>
			<Navbar expand="md" collapseOnSelect variant='dark'>
				<Nav className='navbarContent'>

					<div className='logoBrand'>
						<Navbar.Brand as={NavLink} to="/dives"
							className={splitLocation[1] === "me" ? "logo fw-normal" : "logo fw-normal"}>
							Divegram
						</Navbar.Brand>
					</div>

					{Auth.loggedIn() ? (
						<>
							<div className='navbarItems'>

								<div className='toggleBttn'>
									<Navbar.Toggle aria-controls="basic-navbar-nav" />
								</div>

								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="navbarLinks me-auto d-flex flex-column">
										<Nav.Link as={NavLink} to="/me" eventKey="/me"
											className={splitLocation[1] === "me" ? "fw-bold" : ""}>
											{Auth.getProfile().data.username} {' '}
										</Nav.Link>

										<Nav.Link as={NavLink} to="/newdivelog" eventKey="/newdivelog"
											className={splitLocation[1] === "newdivelog" ? "fw-bold" : " "}>
											Log New Dive
										</Nav.Link>

										<Nav.Link as={NavLink} to="/dives" eventKey="/dives"
											className={splitLocation[1] === "dives" ? "fw-bold" : " "}>
											Explore Dives
										</Nav.Link>

										<Nav.Link as={NavLink} to="/bucketlist" eventKey="/bucketlist"
											className={splitLocation[1] === "bucketlist" ? "fw-bold" : " "}>
											Bucket List
										</Nav.Link>

										<Button variant="warning" onClick={logout} size="sm" className='logOutBttn'>
											Ascend and Exit
										</Button>
									</Nav>
								</Navbar.Collapse>

							</div>
						</>
					) : (
						<>
							<Button className="loginBttn" variant="light" size="sm" onClick={() => handleShow()}>
								Dive In
							</Button>
						</>
					)}

				</Nav>

			</Navbar>

			<AuthModal show={show} onHide={handleClose} />

		</div>
	);
}

export default AppNavbar;