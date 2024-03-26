import React from 'react';
import { useQuery } from '@apollo/client';
import DiveList from '../../components/DiveList';
import { QUERY_DIVES } from '../../utils/queries';
import { useAuth } from '../../utils/AuthContext'

function Dive() {

	const { loading, data } = useQuery(QUERY_DIVES);

	const { user } = useAuth();
	// console.log('user:', user);


	if (loading) {
		return <div>Loading...</div>;
	}


	const divesWithLikeStatus = data?.dives.map(dive => ({
		...dive,
		isLikedByCurrentUser: dive.likes.some(like => like.likedBy._id === user?._id)
	})) || [];


	// console.log('divesWithLikeStatus', divesWithLikeStatus);
	// console.log('User ID:', user?._id);


	return (
		<div style={{ padding: '1rem' }}>
			<div style={{ padding: '1rem' }}>
				<DiveList
					dives={divesWithLikeStatus}
					title="Latest Logged Dives"
				/>
			</div>


		</div>
	);
}

export default Dive;