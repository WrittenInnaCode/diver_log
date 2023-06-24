import { QUERY_USERS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

function Dive() {
	const { loading, data } = useQuery(QUERY_USERS);

	const users = data?.users || [];

	return (
		<h1>
			This is the dives page.

			{loading ? (
				<div>Loading ...</div>
			) : (
					<div>
						{users.map(user => {
							return <p key={user._id}>{user.username}: {user.email}</p>
						})}
					</div>
			)}
		</h1>
	);
}

export default Dive;