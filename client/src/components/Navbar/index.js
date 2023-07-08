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
		<div>
			<Navbar >
				<Container>
					{/* <a href="/">Home</a> */}
					<Navbar.Brand as={Link} to="/">Home</Navbar.Brand>

					<Nav className="me-auto">
						<Nav.Link as={Link} to="/dives">Dives</Nav.Link>
						<Nav.Link as={Link} to="/newdivelog">New Dive Log</Nav.Link>
					</Nav>


					
						{Auth.loggedIn() ? (
							<>
								<Figure>
									<Figure.Image
										width={40}
										height={40}
										alt="user icon"
										src={require(`../../assets/images/Mask.png`)} 
									/>
								</Figure>

								<NavDropdown
									title={Auth.getProfile().data.username}
									id="basic-nav-dropdown"
									className='username'>

									<NavDropdown.Item href="/me">Profile</NavDropdown.Item>

									<NavDropdown.Item href="/dives">View My Dives</NavDropdown.Item>

									<NavDropdown.Item href="/newdivelog">Log New Dive</NavDropdown.Item>

									<NavDropdown.Item href="/bucketlist">My Bucket List</NavDropdown.Item>

									<NavDropdown.Divider />

									<NavDropdown.Item>
										<Button variant="warning" onClick={logout} size="sm"> Ascend and Exit </Button>
									</NavDropdown.Item>
								</NavDropdown>

								{/* <Link to="/me">
									{Auth.getProfile().data.username}'s profile {' '}
								</Link> */}
								{/* <Button variant="warning" onClick={logout} size="sm"> Ascend and Exit </Button> */}
							</>
						) : (
							<>
								<Button variant="info" size="sm" onClick={() => handleShow()}>
									Dive In
								</Button>
							</>
						)}
					


				</Container>
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
		</div>
	);
}

export default AppNavbar;