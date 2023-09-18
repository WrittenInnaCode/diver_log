import { Link } from 'react-router-dom';

import React, { useState } from 'react';

import Login from '../../components/Login';
import Signup from '../../components/Signup';

import Auth from '../../utils/auth';

import { Navbar, Nav, Container, Button, Modal, Tab, Tabs, NavDropdown, Figure } from 'react-bootstrap';


function AppNavbar() {

	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	// Modal:
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);



	return (
		<Container>
			<Navbar expand="sm">
				<Nav className="d-flex flex-row flex-sm-column justify-content-center w-100">
					<Container className='p-2'><Navbar.Brand as={Link} to="/" className='logo '>Dive_log</Navbar.Brand></Container>

					{Auth.loggedIn() ? (
						<>
							<div className='toggleBttn'>
								<Container className='d-flex flex-column' >
									<Navbar.Toggle aria-controls="basic-navbar-nav" />

									<Navbar.Collapse id="basic-navbar-nav" >
										<Nav className="me-auto">
											<div className="navLinks">

												<Nav.Link as={Link} to="/me" className='username fw-semibold '>
													{Auth.getProfile().data.username} {' '}
												</Nav.Link>
												<Nav.Link as={Link} to="/newdivelog">Log New Dive</Nav.Link>

												<Nav.Link as={Link} to="/dives">Explore Dives</Nav.Link>

												<Nav.Link as={Link} to="/bucketlist">Bucket List</Nav.Link>


												<Button variant="warning" onClick={logout} size="sm" className='logOutBttn'> Ascend and Exit </Button>

											</div>
										</Nav>
									</Navbar.Collapse>
								</Container>
							</div>
						</>
					) : (
						<>
							<Button className="loginBttn" variant="info" size="sm" onClick={() => handleShow()}>
								Dive In
							</Button>
						</>
					)}

				</Nav>

			</Navbar>

			<div>
				<Modal show={show} onHide={handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>Welcome!</Modal.Title>
					</Modal.Header>

					<Modal.Body className="bg-light">
						<Tabs
							defaultActiveKey="login"
							className="mb-3, modalTabs"
							fill
							justify
							id="modalTabs"
						>

							<Tab eventKey="login" title="Log In">
								<Login />
							</Tab>

							<Tab eventKey="signup" title="Sign Up">
								<Signup />
							</Tab>

						</Tabs>

					</Modal.Body>
					<Modal.Footer>
					</Modal.Footer>
				</Modal>
			</div>
		</Container>
	);
}

export default AppNavbar;