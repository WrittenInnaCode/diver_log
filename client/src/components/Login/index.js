import React, { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

import { Button, Form, Alert } from 'react-bootstrap';


const Login = () => {

    // Login form:
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [login, { error }] = useMutation(LOGIN_USER);

    useEffect(() => {
        if (error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await login({
                variables: { ...userFormData },
            });

            console.log(data);
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setUserFormData({
            email: '',
            password: '',
        });
    };

    return (

        <div>

            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

                <Form.Group>
                    <Form.Label htmlFor="email"></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your email"
                        name="email"
                        onChange={handleInputChange}
                        value={userFormData.email}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Email is required!
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group>
                    <Form.Label htmlFor="password"></Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Your password"
                        name="password"
                        onChange={handleInputChange}
                        value={userFormData.password}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Password is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type="submit"
                    variant="primary"
                    style={{ marginTop: '1rem' }}
                >
                    Submit
                </Button>


                <Alert
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                    style={{ fontSize: '0.8rem', marginTop: '2rem' }}
                >
                    Oh snapping turtle! Something's wrong with your login credentials! Please try again.
                </Alert>

            </Form>

        </div>
    );
};

export default Login;