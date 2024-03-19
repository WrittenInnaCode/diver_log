import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LIKE_DIVE } from '../../utils/mutations';

import { FaRegHeart, FaHeart } from "react-icons/fa";

const LikeButton = ({ dive, user }) => {
    
    const [liked, setLiked] = useState(false);

    const [likeDive] = useMutation(LIKE_DIVE, {
        variables: { diveId: dive._id },
        onCompleted: (data) => {
            setLiked(!liked);
        },
        onError: (error) => {
            console.error("Error liking/unliking the dive:", error);
        }
    });


    useEffect(() => {
        if (user && dive.likes.find(like => like.likedBy._id === user._id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [dive.likes, user]);


    const handleLikeClick = async () => {
        if (!user) {
            console.log('User must be logged in to like a dive');
            return;
        }
        await likeDive();
    };


    return (
        <div onClick={handleLikeClick}>
            {liked ? <FaHeart /> : <FaRegHeart />}
            <span>{dive.likes.length}</span>
        </div>
    );
};

export default LikeButton;