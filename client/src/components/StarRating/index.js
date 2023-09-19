import React, { useState } from 'react';
import { FaStar } from "react-icons/fa"

// This component is for the New Dive form -- for the user to rate the dive they're logging (not to be confused with DiveRating)

const StarRating = ({ value, onChange }) => {

    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label key={i}>  {/* when rendering a list of elements using the .map function (or similar iteration methods), each element should have a unique key prop assigned to it.*/}

                        <input
                            type='radio'
                            name='rating'
                            onClick={() => onChange(ratingValue)}  // Use the onChange prop to update the rating.. When a star is clicked, it will update the rating using the provided onChange function.
                        />

                        <FaStar
                            className='star'
                            size={25}
                            color={ratingValue <= (hover || value) ? "#ffc107" : "#1f98f482"}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />

                    </label>
                )
            })}
        </div>
    );
};

export default StarRating;