import React from 'react';

import Login from '../../components/Login';
import Signup from '../../components/Signup';

import { Modal, Tab, Tabs } from 'react-bootstrap';

function AuthModal( { show, onHide } ) {

    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
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
    );
}

export default AuthModal;