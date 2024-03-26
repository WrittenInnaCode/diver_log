import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LIKE_DIVE } from '../../utils/mutations';
import { UNLIKE_DIVE } from '../../utils/mutations';
import { QUERY_DIVES } from '../../utils/queries';

import { FaRegHeart, FaHeart } from "react-icons/fa";

const LikeButton = ({ dive, user, onUnauthorizedLike }) => {

    const [liked, setLiked] = useState(dive.isLikedByCurrentUser);

    const [likeDive] = useMutation(LIKE_DIVE, {
        variables: { diveId: dive._id },
        refetchQueries: [{ query: QUERY_DIVES }], // Refetch dives to update UI
    });


    useEffect(() => {
        // Ensure liked state is correctly set when dive prop changes
        setLiked(dive.isLikedByCurrentUser);
    }, [dive.isLikedByCurrentUser]);

    const [unlikeDive] = useMutation(UNLIKE_DIVE, {
        variables: { diveId: dive._id },
        refetchQueries: [{ query: QUERY_DIVES }],
    });


    // console.log('dive.isLikedByCurrentUser:', dive.isLikedByCurrentUser)


    const handleLikeClick = async () => {
        if (!user) {
            onUnauthorizedLike();
            return;
        }
        try {
            if (liked) {
                await unlikeDive();
            } else {
                await likeDive();
            }
            setLiked(!liked); // Optimistically toggle the liked state
        } catch (error) {
            console.error("Error liking/unliking the dive:", error);
        }
    };

    return (
        <div onClick={handleLikeClick}>
            {liked ? <FaHeart /> : <FaRegHeart />} {''}
            <span>{dive.likes.length}</span>
        </div>
    );
};

export default LikeButton;