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
			<Navbar>
				<Nav className="flex-column ">
					<Container className='p-2'><Navbar.Brand as={Link} to="/" className='logo '>Dive_log</Navbar.Brand></Container>
					
					{Auth.loggedIn() ? (
						<>
							<div className="justify-content-md-center">
								{/* <Figure>
									<Figure.Image
										width={40}
										height={40}
										alt="user icon"
										src={require(`../../assets/images/Mask.png`)}
									/>
								</Figure> */}

								<Nav.Link as={Link} to="/me" className='username fw-semibold '>
									{Auth.getProfile().data.username} {' '}
								</Nav.Link>
								<Nav.Link as={Link} to="/newdivelog">Log New Dive</Nav.Link>

								<Nav.Link as={Link} to="/dives">Explore Dives</Nav.Link>


								<Button variant="warning" onClick={logout} size="sm" className='logOutBttn'> Ascend and Exit </Button>

								{/* <NavDropdown
									title={Auth.getProfile().data.username}
									id="basic-nav-dropdown"
									className='username'>

									<NavDropdown.Item href="/me">Profile</NavDropdown.Item>

									<NavDropdown.Item href="/newdivelog">Log New Dive</NavDropdown.Item>

									<NavDropdown.Item href="/bucketlist">My Bucket List</NavDropdown.Item>

									<NavDropdown.Divider />

									<NavDropdown.Item>
										<Button variant="warning" onClick={logout} size="sm"> Ascend and Exit </Button>
									</NavDropdown.Item>
								</NavDropdown> */}
							</div>
						</>
					) : (
						<>
							<Button variant="info" size="sm" onClick={() => handleShow()}>
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