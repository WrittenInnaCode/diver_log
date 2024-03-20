import React, { useState } from 'react';
import AuthModal from '../AuthModal';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const CommentForm = ({ diveId }) => {

  // Modal:
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  const [commentText, setCommentText] = useState('');

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          diveId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText') {
      setCommentText(value);
    }
  };

  return (
    <div>

      {Auth.loggedIn() ? (
        <>
          {/* <h5> Leave a Comment </h5> */}
          <Form onSubmit={handleFormSubmit} style={{ paddingBottom: '1rem', textAlign: "center" }}>

            <Form.Group className="mb-3">
              <Form.Control as="textarea" rows={3}
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                // style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit">
              Add Comment
            </Button>

          </Form>

        </>
      ) : (
        <div style={{ paddingBottom: '1rem', textAlign: "center" }}>
          <Button variant="outline-primary" size="sm" onClick={() => handleShow()} >Log in</Button> to leave a comment
          <AuthModal show={show} onHide={handleClose} />
        </div>
      )}
    </div>
  );
};

export default CommentForm;
