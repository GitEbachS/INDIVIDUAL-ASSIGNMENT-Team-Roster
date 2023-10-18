/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../api/teamData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  // make call to API layer to get the data
  useEffect(() => {
    getSingleMember(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={memberDetails.image} alt={memberDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {memberDetails.name}
        </h5>
        <p>{memberDetails.role}</p>
      </div>
    </div>
  );
}
