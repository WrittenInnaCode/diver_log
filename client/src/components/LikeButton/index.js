import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LIKE_DIVE } from '../../utils/mutations';
import Auth from '../../utils/auth';

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


const LikeButton = ({ dive }) => {

    const [liked, setLiked] = useState(false);

    const [likeDive] = useMutation(LIKE_DIVE);


    useEffect(() => {
        // Check if the dive is liked by the user
        if (Auth.loggedIn() && dive.likes.find(like => like.username === Auth.getProfile().username)) {
            setLiked(true);
        } else {
            setLiked(false)
        }
    }, [dive.likes]);


    const handleLike = async () => {
        try {
            await likeDive({ variables: { diveId: dive._id } });
            setLiked(!liked); // Toggle the liked state
        } catch (error) {
            console.error('Error liking the dive:', error);
        }
    };


    return (
        <div onClick={handleLike}>
            {liked ? <FaHeart /> : <FaRegHeart />}
            <span>{dive.likes.length}</span>
        </div>
    );
};

export default LikeButton;