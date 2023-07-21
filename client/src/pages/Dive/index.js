import React from 'react';
// import { QUERY_USERS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import DiveList from '../../components/DiveList';
import { QUERY_DIVES } from '../../utils/queries';

function Dive() {
	// if I want to see the list of users:
	// const { loading, data } = useQuery(QUERY_USERS);
	// const users = data?.users || [];

	const { loading, data } = useQuery(QUERY_DIVES);
	const dives = data?.dives || [];

	return (
		<div style={{ padding: '1rem' }}>
			<h2>
				This is the dives page.
			</h2>
			<div>
				{loading
					? (
						<div>Loading ...</div>)
					: (
						<div>
							{/* if I want to see the list of users: */}
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


		</div>
	);
}

export default Dive;