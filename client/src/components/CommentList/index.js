import React from 'react';

const CommentList = ({ comments = [] }) => {

  return (
    <>

      {comments && comments.map((comment) => (
          <div key={comment._id} >
            <div>
              <img style={{ maxWidth: '40px', maxHeight: '40px', marginRight: '5px' }}
                src={comment.commentAuthor?.avatar} alt="Author's Avatar" />
              {comment.commentAuthor?.username}
            </div>


            <div>Date:{comment.createdAt}</div>

            <div>{comment.commentText}</div>
          </div>
        ))}

    </>
  );
};

export default CommentList;
