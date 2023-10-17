import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const CommentForm = ({ diveId }) => {
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

      <h3> Leave a Comment </h3>

      {Auth.loggedIn() ? (
        <>

          <Form onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3">
              <Form.Control as="textarea" rows={3}
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                // style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              />
            </Form.Group>

            <br />
              <Button type="submit">
                Add Comment
              </Button>

          </Form>

        </>
      ) : (
        <p>
          You need to be logged in to comment. 
          {/* Please{' '} */}
          {/* <Link to="/login">login</Link> or <Link to="/signup">signup.</Link> */}
        </p>
      )}
    </div>
  );
};

export default CommentForm;
