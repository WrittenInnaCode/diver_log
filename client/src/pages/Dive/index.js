import React from 'react';

// import { QUERY_USERS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import DiveList from '../../components/DiveList';
import { QUERY_DIVES } from '../../utils/queries';

function Dive() {
	// const { loading, data } = useQuery(QUERY_USERS);

	// const users = data?.users || [];

	const { loading, data } = useQuery(QUERY_DIVES);
	const dives = data?.dives || [];

	return (
		<div>
			<h2>
				This is the dives page.
			</h2>
			{loading ? (
				<div>Loading ...</div>
			) : (
				<div>
					{/* <div>
				 	{users.map(user => {
					return <p key={user._id}>{user.username}: {user.email}</p>
					})}
				</div> */}

					<DiveList
						dives={dives}
						title="All Dives"
					/>
				</div>
			)}

		</div>
	);
}

export default Dive;