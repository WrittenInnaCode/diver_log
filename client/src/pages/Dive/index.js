import React from 'react';
import { useQuery } from '@apollo/client';
import DiveList from '../../components/DiveList';
import { QUERY_DIVES } from '../../utils/queries';

function Dive() {

	const { loading, data } = useQuery(QUERY_DIVES);
	const dives = data?.dives || [];

	return (
		<div style={{ padding: '1rem' }}>
			<div>
				{loading
					? (
						<div>Loading ...</div>)
					: (
						<div>
							<DiveList
								dives={dives}
								title="Viewing All Dives"
							/>
						</div>
					)}
			</div>


		</div>
	);
}

export default Dive;