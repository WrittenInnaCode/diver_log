import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import NewDive from '../NewDive';

import { QUERY_SINGLE_DIVE } from '../../utils/queries';

import { EDIT_DIVE } from '../../utils/mutations';


const EditDive = () => {

    const { diveId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_DIVE, {
        variables: { diveId: diveId },
    });
    console.log(data)

    const [editDive] = useMutation(EDIT_DIVE);

    if (loading) {
        return <div>Loading...</div>;
    }

    const dive = data?.dive || {};

    return (

        <div>
            <NewDive edit formData={dive} diveId={diveId} editDive={editDive} />
        </div>

    );
};


export default EditDive;