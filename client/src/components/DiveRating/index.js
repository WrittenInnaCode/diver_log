import React from 'react';
import { FaStar } from "react-icons/fa"

// This component is for showing the rating of the dive that has been logged (not to be confused with StarRating)

const DiveRating = ({ rating }) => {
  // Calculate the number of filled stars based on the rating
  const filledStars = Math.round(rating);

  // Create an array of stars to render
  const stars = Array(5).fill(null).map((_, index) => (
    <span 
    key={index} 
    className={index < filledStars ? 'star-filled' : 'star-empty'}>
        <FaStar />
        {/* &#9733; // HTML entity code for a solid star */}
    </span>
  ));

  return <div className="star-rating">{stars}</div>;
};

export default DiveRating;