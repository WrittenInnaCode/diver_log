import React from 'react';
import Image from 'react-bootstrap/Image';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const CommentList = ({ comments = [] }) => {

  return (
    <>
      <Container className='pt-3'>

        {comments && comments.map((comment) => (
          <Container key={comment._id} className='pt-3 pb-2 border-light border-top'>
            <Row>
              <Col xs="auto" >
                <Image roundedCircle style={{ maxWidth: '40px', maxHeight: '40px' }}
                  src={comment.commentAuthor?.avatar} alt="Author's Avatar" />
              </Col>


              <Col>
                <p style={{ fontWeight: 'bold' }}>{comment.commentAuthor?.username}</p>
                <p>{comment.commentText}</p>
              </Col>

              <Col >
                <p style={{ textAlign: "end", fontSize: "12px" }}>{comment.createdAt}</p>
              </Col>
            </Row>

          </Container>
        ))}

      </Container>
    </>
  );
};

export default CommentList;
