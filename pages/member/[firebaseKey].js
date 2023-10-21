/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewMemberDetails } from '../../api/mergedData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();

  // grab firebaseKey from url
  const { firebaseKey } = router.query;

  // make call to API layer to get the data
  useEffect(() => {
    viewMemberDetails(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="memberCard mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={memberDetails.image} alt={memberDetails.name} style={{ height: '300px' }} />
      </div>
      <div className=" memberBody ms-5 details">
        <h5>
          {memberDetails.name}
        </h5>
        <p>{memberDetails.role}</p>
        <h5>
          {memberDetails.teamObject?.name}
        </h5>
      </div>
    </div>
  );
}
