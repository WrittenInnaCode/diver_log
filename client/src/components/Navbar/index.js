import { Link } from 'react-router-dom';

import React, { useState } from 'react';

import Login from '../../components/Login';
import Signup from '../../components/Signup';

import Auth from '../../utils/auth';

import { Navbar, Nav, Container, Button, Modal, Tab, Tabs, Row, Col } from 'react-bootstrap';


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
		<Navbar>
			<Container>
				{/* <a href="/">Home</a> */}
				<Navbar.Brand as={Link} to="/">Home</Navbar.Brand>

				<Nav className="me-auto">
					<Nav.Link as={Link} to="/about">About</Nav.Link>
					<Nav.Link as={Link} to="/contact">Contact</Nav.Link>
				</Nav>


				<div className="d-flex">
					{Auth.loggedIn() ? (
						<>
							<Link to="/me">
								{Auth.getProfile().data.username}'s profile {' '}
							</Link>
							<Button onClick={logout} size="sm"> Logout </Button>
						</>
					) : (
						<>
							<Button variant="success" size="sm" onClick={() => handleShow()}>
								Login
							</Button>
						</>
					)}


					<Navbar handleShow={handleShow} />

					<Modal show={show} onHide={handleClose} centered>
						<Modal.Header closeButton>
							{/* <Modal.Title>Modal heading</Modal.Title> */}
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
		</Navbar>
	);
}

export default AppNavbar;